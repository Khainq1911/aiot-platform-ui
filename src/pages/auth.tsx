import { Cpu, Wifi } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginServices, signupServices } from "@/services/auth.services";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type { loginDto, signupDto} from "@/types/auth.types";

export default function AuthPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<string>("login");
  const [loginData, setLoginData] = useState<loginDto>({
    username: "",
    password: "",
  });

  const [signupData, setSignupData] = useState<signupDto>({
    name: "",
    email: "",
    telephone: "",
    password: "",
  });
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTab = (value: string) => {
    setTabValue(value);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await loginServices(loginData);
      localStorage.setItem("accessToken", res.accessToken);
      toast.success("Login successful!", {
        description: "Welcome back! You have successfully logged in.",
        style: {
          background: "var(--toast-success-bg)",
          color: "var(--toast-text)",
        },
      });

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Login failed!", {
          description:
            error.response?.data.message || "An error occurred during login.",
          style: {
            background: "var(--toast-error-bg)",
            color: "var(--toast-text)",
          },
        });
      }
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signupServices(signupData);
      toast.success("Sign up successful!", {
        description:
          "Your account has been created. Please log in to continue.",
        style: {
          background: "var(--toast-success-bg)",
          color: "var(--toast-text)",
        },
      });
      handleChangeTab("login");
    } catch (error: unknown) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message;
      }

      toast.error("Sign up failed!", {
        description: message,
        style: {
          background: "var(--toast-error-bg)",
          color: "var(--toast-text)",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <Cpu className="h-8 w-8 text-blue-600" />
              <Wifi className="h-4 w-4 text-green-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">AIoT Platform</h1>
          </div>
          <p className="text-slate-600">Intelligent IoT Solutions</p>
        </div>

        <Card className="shadow-lg border-0 w-[400px]">
          <Tabs
            defaultValue="login"
            value={tabValue}
            onValueChange={handleChangeTab}
          >
            <CardHeader className="space-y-1 pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    onChange={handleLoginChange}
                    id="login-username"
                    type="username"
                    name="username"
                    placeholder="Enter your username"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      onChange={handleLoginChange}
                      id="login-password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="h-11 pr-10"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Button variant="link" className="px-0 text-sm text-blue-600">
                    Forgot password?
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="mt-4">
                <Button
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                  type="submit"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="signup">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    onChange={handleSignupChange}
                    name="name"
                    id="signup-name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    onChange={handleSignupChange}
                    name="email"
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone</Label>
                  <Input
                    onChange={handleSignupChange}
                    name="phone"
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    onChange={handleSignupChange}
                    name="password"
                    id="signup-password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-11"
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-4">
                <Button
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                  type="submit"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6 text-sm text-slate-500">
          <p>© 2025 AIoT Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
