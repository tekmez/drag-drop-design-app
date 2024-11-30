import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PropertiesPanelProps {
  selectedComponent: {
    id: string;
    left: number;
    top: number;
    width: number;
    height: number;
    backgroundColor?: string;
  } | null;
  onUpdate: (updates: any) => void;
}
const PropertiesPanel = ({
  selectedComponent,
  onUpdate,
}: PropertiesPanelProps) => {
  if (!selectedComponent)
    return <Label>Please select a component to see its properties panel</Label>;

  return (
    <div className="p-4 bg-gray-100 border border-gray-200 rounded-md flex flex-col gap-1">
      <div>
        <Label htmlFor="xPosition">X Position:</Label>
        <Input
          id="xPosition"
          type="number"
          className="mt-1"
          value={selectedComponent.left}
          onChange={(e) => onUpdate({ left: Number(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="yPosition">Y Position:</Label>
        <Input
          id="yPosition"
          type="number"
          className="mt-1"
          value={selectedComponent.top}
          onChange={(e) => onUpdate({ top: Number(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="width">Width:</Label>
        <Input
          id="width"
          type="number"
          min="0"
          className="mt-1"
          value={selectedComponent.width}
          onChange={(e) => onUpdate({ width: Number(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="height">Height:</Label>
        <Input
          id="height"
          type="number"
          min="0"
          className="mt-1"
          value={selectedComponent.height}
          onChange={(e) => onUpdate({ height: Number(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="bgColor">Background color</Label>
        <Input
          id="bgColor"
          type="color"
          min="0"
          className="mt-1"
          value={selectedComponent.backgroundColor}
          onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
        />
      </div>
    </div>
  );
};

export default PropertiesPanel;
