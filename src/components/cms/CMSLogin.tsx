import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CMSLoginProps {
  onLogin: (email: string, password: string) => boolean;
}

const CMSLogin = ({ onLogin }: CMSLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate loading
    setTimeout(() => {
      const success = onLogin(email, password);
      setIsLoading(false);
      
      if (success) {
        toast({
          title: "Login Successful!",
          description: "Welcome to VAMPForge CMS Dashboard.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive"
        });
        setErrors({ email: 'Invalid credentials', password: 'Invalid credentials' });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VAMPForge CMS
            </span>
          </h1>
          <p className="text-muted-foreground">
            Content Management System
          </p>
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="admin@vampforge.site"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    placeholder="VampForge2025"
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Default Credentials Info */}
        <Card className="card-shadow">
          <CardContent className="p-4 text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Default Credentials:</p>
            <p className="text-xs text-muted-foreground">Email: admin@vampforge.site</p>
            <p className="text-xs text-muted-foreground">Password: VampForge2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CMSLogin;