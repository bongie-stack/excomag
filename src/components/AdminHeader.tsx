import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/excomag-logo.png";

interface AdminHeaderProps {
  onLogout: () => void;
  userEmail?: string;
}

const AdminHeader = ({ onLogout, userEmail }: AdminHeaderProps) => {
  return (
    <header className="bg-card card-shadow border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Admin Label */}
          <div className="flex items-center space-x-4">
            <img 
              src={logo} 
              alt="ExcoMag Africa Logo" 
              className="h-10 w-auto"
            />
            <div className="border-l pl-4">
              <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Content Management System</p>
            </div>
          </div>

          {/* Navigation and User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            
            {userEmail && (
              <span className="text-sm text-muted-foreground hidden md:block">
                {userEmail}
              </span>
            )}
            
            <Button 
              variant="outline" 
              onClick={onLogout}
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;