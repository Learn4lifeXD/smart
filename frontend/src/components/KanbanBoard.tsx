"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type DossierCard = {
  id: string;
  code: string;
  title: string;
  description: string;
  value: string;
  assignees: string[];
  statusColor: string;
  isError?: boolean;
};

type ColumnData = {
  id: string;
  title: string;
  cards: DossierCard[];
  colorClass: string;
};

const initialColumns: ColumnData[] = [
  {
    id: "initiation",
    title: "Initiation",
    colorClass: "bg-tertiary",
    cards: [
      {
        id: "dos-4092",
        code: "DOS-4092",
        title: "Estate Vanguard, Sector 4",
        description: "Initial surveyor report submitted. Awaiting zoning confirmation from municipal database.",
        value: "$4.2M",
        assignees: ["JD"],
        statusColor: "bg-tertiary",
      }
    ]
  },
  {
    id: "appraisal",
    title: "Appraisal",
    colorClass: "bg-secondary led-pending",
    cards: [
      {
        id: "dos-4088",
        code: "DOS-4088",
        title: "Industrial Tract B-9",
        description: "Independent valuation ongoing. Discrepancy noted in soil remediation estimates.",
        value: "$12.8M",
        assignees: ["MK", "AL"],
        statusColor: "bg-secondary led-pending",
      }
    ]
  },
  {
    id: "legal",
    title: "Legal Review",
    colorClass: "bg-error",
    cards: [
      {
        id: "dos-3991",
        code: "DOS-3991",
        title: "Heritage Block 7",
        description: "Contested eminent domain claim. Injunction filed by historical preservation society.",
        value: "$8.5M",
        assignees: ["LC"],
        statusColor: "bg-error shadow-[0_0_8px_#ffb4ab]",
        isError: true,
      }
    ]
  },
  {
    id: "negotiation",
    title: "Negotiation",
    colorClass: "bg-primary led-active",
    cards: [
      {
        id: "dos-3850",
        code: "DOS-3850",
        title: "Commercial Plaza Omega",
        description: "Finalizing compensation package with majority stakeholders. Draft agreement circulated.",
        value: "$24.1M",
        assignees: ["RT", "SW"],
        statusColor: "bg-primary led-active",
      }
    ]
  }
];

export default function KanbanBoard() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
      const destColIndex = columns.findIndex(c => c.id === destination.droppableId);
      const sourceCol = columns[sourceColIndex];
      const destCol = columns[destColIndex];

      const sourceCards = [...sourceCol.cards];
      const destCards = [...destCol.cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);

      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, cards: sourceCards };
      newColumns[destColIndex] = { ...destCol, cards: destCards };
      setColumns(newColumns);
    } else {
      const colIndex = columns.findIndex(c => c.id === source.droppableId);
      const column = columns[colIndex];
      const copiedCards = [...column.cards];
      const [removed] = copiedCards.splice(source.index, 1);
      copiedCards.splice(destination.index, 0, removed);

      const newColumns = [...columns];
      newColumns[colIndex] = { ...column, cards: copiedCards };
      setColumns(newColumns);
    }
  };

  if (!isBrowser) return null; // Avoid hydration mismatch for dnd

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-gutter flex gap-6 pb-8">
        {columns.map((col) => (
          <div key={col.id} className="min-w-[320px] w-[320px] flex flex-col h-full bg-surface-container-lowest/30 rounded-xl border border-outline-variant/10 backdrop-blur-sm">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.colorClass}`}></div>
                <h4 className="font-label-md text-label-md text-on-surface tracking-wider uppercase">{col.title}</h4>
                <span className="text-tertiary text-xs bg-surface-container px-2 py-0.5 rounded-full ml-2">{col.cards.length}</span>
              </div>
              <button className="text-tertiary hover:text-secondary"><span className="material-symbols-outlined text-[18px]">more_horiz</span></button>
            </div>
            
            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-3 flex-1 overflow-y-auto kanban-column flex flex-col gap-3 transition-colors ${snapshot.isDraggingOver ? 'bg-surface-container-highest/20' : ''}`}
                >
                  {col.cards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`glass-panel card-active rounded-lg p-4 cursor-pointer group shadow-lg ${snapshot.isDragging ? 'rotate-2 scale-105 z-50 shadow-2xl border-secondary/50' : ''} ${card.isError ? 'border-error/30 hover:border-error/80' : ''}`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className={`h-[1px] w-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity ${card.isError ? 'bg-gradient-to-r from-error/50 to-transparent' : 'card-gradient-line'}`}></div>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs font-mono ${card.isError ? 'text-error' : 'text-secondary'}`}>{card.code}</span>
                            <div className={`w-2 h-2 rounded-full ${card.statusColor}`}></div>
                          </div>
                          <h5 className="font-headline-md text-[16px] text-on-surface mb-1">{card.title}</h5>
                          <p className={`font-body-md text-[13px] line-clamp-2 mb-4 ${card.isError ? 'text-error/80' : 'text-on-surface-variant'}`}>{card.description}</p>
                          <div className="flex justify-between items-end border-t border-outline-variant/20 pt-3">
                            <div>
                              <span className="block text-[10px] text-tertiary uppercase tracking-wider">Est. Value</span>
                              <span className="font-label-md text-on-surface">{card.value}</span>
                            </div>
                            <div className="flex -space-x-2">
                              {card.assignees.map((assignee, i) => (
                                <div key={i} className="w-6 h-6 rounded-full border border-surface bg-surface-container flex items-center justify-center text-[10px] text-tertiary">{assignee}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
