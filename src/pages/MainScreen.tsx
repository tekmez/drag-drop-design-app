import { componentsList } from "@/componentList";
import PropertiesPanel from "@/components/PropertiesPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ComponentData } from "@/types/globalTypes";
import { loadDesign, saveDesign } from "@/utils/storage";
import { useState } from "react";

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
      width: type === "image" ? 250 : 100,
      height: 40,
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
    setSelectedComponent(null);
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
      border: "1px solid",
      borderColor: element.borderColor,
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
      case "checkbox":
        return <Checkbox {...props} defaultChecked />;
      case "image":
        return <Input {...props} type="file" />;
      default:
        return null;
    }
  };

  const saveCurrentDesign = () => {
    saveDesign(droppedComponents);
    alert("Tasarım kaydedildi!");
  };

  const loadSavedDesign = () => {
    const savedDesign = loadDesign();
    if (savedDesign) {
      setDroppedComponents(savedDesign);
      alert("Kaydedilen tasarım yüklendi!");
    } else {
      alert("Kaydedilen bir tasarım bulunamadı.");
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
          <div className="mt-1">
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
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-2">Design Area</h2>
            <div className="flex justify-end mb-2 gap-2">
              {selectedComponent && (
                <Button variant={"destructive"} onClick={handleDeleteComponent}>
                  Delete Component
                </Button>
              )}
              <Button className="bg-green-600" onClick={saveCurrentDesign}>
                Save Design
              </Button>
              <Button onClick={loadSavedDesign} className="bg-purple-500">
                Load Design
              </Button>
            </div>
          </div>
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
