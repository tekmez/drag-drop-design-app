import { PropertiesPanelProps } from "@/types/globalTypes";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const PropertiesPanel = ({
  selectedComponent,
  onUpdate,
}: PropertiesPanelProps) => {
  if (!selectedComponent)
    return <Label>Please select a component to see its properties panel</Label>;

  // List of properties to display in the panel
  const propertiesList: {
    label: string;
    key: keyof typeof selectedComponent;
  }[] = [
    { label: "X Position", key: "left" },
    { label: "Y Position", key: "top" },
    { label: "Width", key: "width" },
    { label: "Height", key: "height" },
    { label: "Background", key: "backgroundColor" },
    { label: "Border", key: "borderColor" },
  ];
  return (
    <div className="p-4 border border-gray-200 rounded-md grid grid-cols-2 gap-2">
      {propertiesList.map((property) => (
        <div key={property.key}>
          <Label htmlFor={property.key}>{property.label}</Label>
          <Input
            id={property.key}
            type={
              property.key === "backgroundColor" ||
              property.key === "borderColor"
                ? "color"
                : "number"
            }
            min="0"
            className="mt-1"
            value={selectedComponent[property.key] ?? ""}
            onChange={(e) =>
              onUpdate({
                [property.key]:
                  property.key === "backgroundColor" ||
                  property.key === "borderColor"
                    ? e.target.value
                    : Number(e.target.value),
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default PropertiesPanel;
