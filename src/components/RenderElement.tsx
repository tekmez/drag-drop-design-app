import { ComponentData } from "@/pages/MainScreen";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const RenderElement = (element: ComponentData) => {
  switch (element.type) {
    case "button":
      return (
        <Button className={`relative left-${element.left} top-${element.top}`}>
          Button
        </Button>
      );
    case "input":
      return (
        <Input
          className={`relative left-${element.left} top-${element.top}`}
          placeholder="Input"
        />
      );
    case "textarea":
      return (
        <Textarea
          className={`relative left-${element.left} top-${element.top}`}
          placeholder="Textarea"
        />
      );
    default:
      return null;
  }
};

export default RenderElement;
