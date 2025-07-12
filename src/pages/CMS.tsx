import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CMSDashboard from '@/components/cms/CMSDashboard';
import { useCMSData } from '@/hooks/useCMSData';

const CMSLogin = ({ onLogin }: { onLogin: (email: string, password: string) => boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = onLogin(email, password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to VAMPForge CMS Admin Panel",
        });
      } else {
        toast({
          title: "Login Failed", 
          description: "Invalid credentials. Only admin@vampforge.site can access CMS.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-background/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card border-0 overflow-hidden">
          <CardHeader className="text-center space-y-4 pb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto"
            >
              <Lock className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <CardTitle className="text-2xl font-bold contrast-heading">
              VAMPForge <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CMS</span>
            </CardTitle>
            <p className="text-muted-foreground text-sm">Admin access required</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@vampforge.site"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 glass-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="VampForge2025"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 glass-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full glass-button" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Login to CMS
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center space-y-2 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Default Admin Credentials:</p>
              <p className="text-xs font-mono bg-muted/20 p-2 rounded">
                admin@vampforge.site / VampForge2025
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const CMS = () => {
  const { isAuthenticated, authenticate } = useCMSData();

  if (isAuthenticated) {
    return <CMSDashboard />;
  }

  return <CMSLogin onLogin={authenticate} />;
};

export default CMS;