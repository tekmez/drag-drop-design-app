/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }

export interface PrivateRouteProps {
    children: React.ReactNode;
  }
  
export interface ComponentData extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    type: "button" | "input" | "textarea" | "checkbox" | "image";
    left: number;
    top: number;
    width: number;
    height: number;
    backgroundColor?: string;
    borderColor?: string;
    handleComponentDragStart?: () => void;
    handleComponentDragEnd?: (e: React.DragEvent) => void;
  }

export interface PropertiesPanelProps {
    selectedComponent: {
      id: string;
      left: number;
      top: number;
      width: number;
      height: number;
      backgroundColor?: string;
      borderColor?: string;
    } | null;
    onUpdate: (updates: any) => void;
  }