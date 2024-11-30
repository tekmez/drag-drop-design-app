import PropertiesPanel from "@/components/PropertiesPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
interface ComponentData extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  type: "button" | "input" | "textarea";
  left: number;
  top: number;
  width: number;
  height: number;
  backgroundColor?: string;
  handleComponentDragStart?: () => void;
  handleComponentDragEnd?: (e: React.DragEvent) => void;
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
  const [draggingComponent, setDraggingComponent] = useState<string | null>(
    null
  );
  const [droppedComponents, setDroppedComponents] = useState<ComponentData[]>(
    []
  );
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);

  // Drag and Drop from Components List to Design Area
  const handleDragStart = (e: React.DragEvent, type: ComponentData["type"]) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type") as ComponentData["type"];
    const newComponent = {
      id: String(Date.now()),
      type,
      left: e.clientX - 40,
      top: e.clientY - 20,
      width: 100,
      height: 40,
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Selecting a component from Design Area
  const handleComponentClick = (componentId: string) => {
    const component = droppedComponents.find((comp) => comp.id === componentId);
    setSelectedComponent(component || null);
  };

  // Update Component Properties from Properties Panel
  const updateComponentProperties = (updates: Partial<ComponentData>) => {
    if (!selectedComponent) return;

    setDroppedComponents((prev) =>
      prev.map((comp) =>
        comp.id === selectedComponent.id ? { ...comp, ...updates } : comp
      )
    );

    setSelectedComponent((prev) => (prev ? { ...prev, ...updates } : null));
  };

  // Delete Component from Design Area
  const handleDeleteComponent = () => {
    if (!selectedComponent) return;

    setDroppedComponents((prev) =>
      prev.filter((comp) => comp.id !== selectedComponent.id)
    );
    setSelectedComponent(null);
  };

  // Dragging Components in Design Area
  const handleComponentDragStart = (componentId: string) => {
    setDraggingComponent(componentId);
  };

  const handleComponentDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    setDroppedComponents((prev) =>
      prev.map((comp) =>
        comp.id === draggingComponent
          ? { ...comp, left: e.clientX - 40, top: e.clientY - 20 }
          : comp
      )
    );
  };

  // Render Element based on Component Type in Design Area
  const renderElement = (element: ComponentData) => {
    const style: React.CSSProperties = {
      position: "absolute",
      left: element.left,
      top: element.top,
      width: element.width,
      height: element.height,
      backgroundColor: element.backgroundColor,
    };
    const props = {
      style,
      draggable: true,
      onDragStart: () => handleComponentDragStart(element.id),
      onDragEnd: handleComponentDragEnd,
    };
    switch (element.type) {
      case "button":
        return <Button {...props}> Button </Button>;
      case "input":
        return <Input {...props} placeholder="Input" />;
      case "textarea":
        return <Textarea {...props} placeholder="Textarea" />;
      default:
        return null;
    }
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
            className="min-h-[600px] p-2"
          >
            <CardContent className="space-y-2">
              {droppedComponents.map((element) => (
                <div
                  key={element.id}
                  onClick={() => handleComponentClick(element.id)}
                >
                  {renderElement(element)}
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
