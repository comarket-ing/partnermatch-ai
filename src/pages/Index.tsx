import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Discovery from "@/pages/Discovery";
import Mapping from "@/pages/Mapping";
import SettingsView from "@/pages/SettingsView";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [userRole, setUserRole] = useState<"manager" | "admin">("manager");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
      case "discovery":
        return <Discovery />;
      case "mapping":
        return <Mapping />;
      case "settings":
        return <SettingsView />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <AppLayout
      currentView={currentView}
      onNavigate={setCurrentView}
      userRole={userRole}
      onRoleChange={setUserRole}
    >
      {renderView()}
    </AppLayout>
  );
};

export default Index;
