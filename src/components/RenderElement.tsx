import { ComponentData } from "@/pages/MainScreen";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const RenderElement = (element: ComponentData) => {
  switch (element.type) {
    case "button":
      return (
        <Button
          style={{
            position: "relative",
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            backgroundColor: element.backgroundColor,
          }}
        >
          Button
        </Button>
      );
    case "input":
      return (
        <Input
          style={{
            position: "relative",
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            backgroundColor: element.backgroundColor,
          }}
          placeholder="Input"
        />
      );
    case "textarea":
      return (
        <Textarea
          style={{
            position: "relative",
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            backgroundColor: element.backgroundColor,
          }}
          placeholder="Textarea"
        />
      );
    default:
      return null;
  }
};

export default RenderElement;
