import RenderElement from "@/components/RenderElement";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
export interface ComponentData {
  id: string;
  type: "button" | "input" | "textarea";
  left: number;
  top: number;
}

const componentsList: ComponentData[] = [
  { id: "button", type: "button", left: 0, top: 0 },
  { id: "input", type: "input", left: 0, top: 0 },
  { id: "textarea", type: "textarea", left: 0, top: 0 },
];
const MainScreen = () => {
  const [droppedComponents, setDroppedComponents] = useState<ComponentData[]>(
    []
  );
  const handleDragStart = (e: React.DragEvent, type: ComponentData["type"]) => {
    e.dataTransfer.setData("type", type);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer.getData("type") as ComponentData["type"];
    const newComponent = {
      id: String(Date.now()),
      type,
      left: e.clientX - 200, // Adjust offset for proper placement
      top: e.clientY - 100,
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Design App</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-2">Form Elements</h2>
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
          <div className="mt-4">
            <Label htmlFor="border-radius">Border Radius (px)</Label>
            <Input
              id="border-radius"
              type="number"
              // value={borderRadius}
              // onChange={handleBorderRadiusChange}
              min="0"
              className="mt-1"
            />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-lg font-semibold mb-2">Design Area</h2>
          <Card
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="min-h-[400px] p-4"
          >
            <CardContent className="space-y-2">
              {droppedComponents.map((element) => (
                <div key={element.id} className="p-2">
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
