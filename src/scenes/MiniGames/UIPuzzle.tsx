import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiMove, FiEye, FiCode, FiImage } from 'react-icons/fi';

// Type for a single UI component block
type ComponentItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

// --- Draggable Item Component ---
const SortableItem = ({ item }: { item: ComponentItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center p-4 mb-4 bg-gray-800/50 border border-blue-500/20 rounded-lg shadow-md cursor-grab active:cursor-grabbing"
    >
      <FiMove className="mr-4 text-gray-400" />
      <div className="flex-shrink-0 mr-4 text-blue-400">{item.icon}</div>
      <span className="text-white font-semibold">{item.name}</span>
    </div>
  );
};

// --- Main UI Puzzle Component ---

const initialItems: ComponentItem[] = [
  { id: 'header', name: 'Header', icon: <FiEye size={20} /> },
  { id: 'sidebar', name: 'Sidebar', icon: <FiCode size={20} /> },
  { id: 'card', name: 'Image Card', icon: <FiImage size={20} /> },
];

const UIPuzzle = () => {
  const [items, setItems] = useState<ComponentItem[]>(initialItems);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10">
      <h2 className="text-3xl font-bold text-center mb-2 text-white font-orbitron">
        Assemble the UI
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Drag and drop the components to build the perfect layout.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Drop Zone */}
        <div className="col-span-2 p-6 bg-gray-900/70 rounded-lg border-2 border-dashed border-gray-600 min-h-[300px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        
        {/* Component Source (concept, not functional yet) */}
        <div className="p-6 bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-white">Toolbox</h3>
          <p className="text-gray-400 text-sm">
            This is where you'd typically drag components from. For this puzzle, just re-order the components on the left!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UIPuzzle;
