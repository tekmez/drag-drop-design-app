import PropertiesPanel from "@/components/PropertiesPanel";
import RenderElement from "@/components/RenderElement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
export interface ComponentData {
  id: string;
  type: "button" | "input" | "textarea";
  left: number;
  top: number;
  width: number;
  height: number;
  backgroundColor?: string;
}

const componentsList: ComponentData[] = [
  { id: "button", type: "button", left: 0, top: 0, width: 100, height: 40 },
  { id: "input", type: "input", left: 0, top: 0, width: 200, height: 40 },
  {
    id: "textarea",
    type: "textarea",
    left: 0,
    top: 0,
    width: 200,
    height: 100,
  },
];
const MainScreen = () => {
  const [droppedComponents, setDroppedComponents] = useState<ComponentData[]>(
    []
  );
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);

  const handleDragStart = (e: React.DragEvent, type: ComponentData["type"]) => {
    e.dataTransfer.setData("type", type);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer.getData("type") as ComponentData["type"];
    const newComponent = {
      id: String(Date.now()),
      type,
      left: 15,
      top: 0,
      width: 100,
      height: 40,
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleComponentClick = (componentId: string) => {
    const component = droppedComponents.find((comp) => comp.id === componentId);
    setSelectedComponent(component || null);
  };

  const updateComponentProperties = (updates: Partial<ComponentData>) => {
    if (!selectedComponent) return;

    setDroppedComponents((prev) =>
      prev.map((comp) =>
        comp.id === selectedComponent.id ? { ...comp, ...updates } : comp
      )
    );

    setSelectedComponent((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const handleDeleteComponent = () => {
    if (!selectedComponent) return;

    setDroppedComponents((prev) =>
      prev.filter((comp) => comp.id !== selectedComponent.id)
    );
    setSelectedComponent(null);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Design App</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Form Elements
          </h2>
          {/* Components List */}
          <div className="space-y-2">
            {componentsList.map((element) => (
              <div
                key={element.id}
                draggable
                onDragStart={(e) => handleDragStart(e, element.type)}
                className="p-2 bg-gray-100 rounded cursor-move"
              >
                {element.id}
              </div>
            ))}
          </div>
          {/* Proporties */}
          {selectedComponent && (
            <Button className="w-full mt-4" onClick={handleDeleteComponent}>
              Delete Component
            </Button>
          )}
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Properties Panel
            </h2>
            <PropertiesPanel
              selectedComponent={selectedComponent}
              onUpdate={updateComponentProperties}
            />
          </div>
        </div>
        {/* Design Area */}
        <div className="w-full md:w-3/4">
          <h2 className="text-lg font-semibold mb-2">Design Area</h2>
          <Card
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="min-h-[400px] p-4"
          >
            <CardContent className="space-y-2">
              {droppedComponents.map((element) => (
                <div
                  key={element.id}
                  className="p-2"
                  onClick={() => handleComponentClick(element.id)}
                >
                  {RenderElement(element)}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
