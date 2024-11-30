import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PropertiesPanelProps {
  selectedComponent: {
    id: string;
    left: number;
    top: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
  } | null;
  onUpdate: (
    updates: Partial<PropertiesPanelProps["selectedComponent"]>
  ) => void;
}
const ProportiesPanel = ({
  selectedComponent,
  onUpdate,
}: PropertiesPanelProps) => {
  if (!selectedComponent) return <div>Please select a component</div>;

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
      }}
    >
      <h4>Properties</h4>
      <div>
        <Label htmlFor="xPosition">X Position:</Label>
        <Input
          id="xPosition"
          type="number"
          min="0"
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
          min="0"
          className="mt-1"
          value={selectedComponent.top}
          onChange={(e) => onUpdate({ top: Number(e.target.value) })}
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

export default ProportiesPanel;
