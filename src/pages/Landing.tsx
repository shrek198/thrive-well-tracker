
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, PieChart, Calendar, Weight, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import ThemeToggle from '@/components/Layout/ThemeToggle';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 shadow-sm z-50 backdrop-blur-sm dark:bg-background/80 dark:border-b dark:border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">FitTracker</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <ThemeToggle />
                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('features')} 
                      className={navigationMenuTriggerStyle()}
                    >
                      Features
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('testimonials')} 
                      className={navigationMenuTriggerStyle()}
                    >
                      Testimonials
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button 
                      onClick={() => scrollToSection('register')} 
                      className={navigationMenuTriggerStyle()}
                    >
                      Register
                    </button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex items-center gap-2 ml-4">
                <Button asChild variant="outline">
                  <Link to="/auth">Log In</Link>
                </Button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu />
              </Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 pt-2">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="px-3 py-2 rounded-md hover:bg-muted"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')} 
                  className="px-3 py-2 rounded-md hover:bg-muted"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection('register')} 
                  className="px-3 py-2 rounded-md hover:bg-muted"
                >
                  Register
                </button>
                <Link 
                  to="/auth" 
                  className="px-3 py-2 rounded-md hover:bg-muted text-primary"
                >
                  Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with padding for navbar - preserved regardless of theme */}
      <header className="hero-section bg-gradient-to-br from-primary/90 to-primary text-white pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Activity className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">FitTracker</h1>
            <p className="text-xl mb-8">Your personal fitness companion to track workouts, nutrition, and progress all in one place.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" size="lg">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white hover:bg-white/20 border-white" size="lg" onClick={() => scrollToSection('features')}>
                <button>Learn More</button>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Everything You Need To Reach Your Fitness Goals</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Track Workouts</h3>
              <p className="text-muted-foreground">Log exercises, sets, reps, and duration to keep track of your fitness journey.</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-all">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Monitor Nutrition</h3>
              <p className="text-muted-foreground">Track meals, calories, and macronutrients to optimize your diet.</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Weight className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Visualize Progress</h3>
              <p className="text-muted-foreground">See your progress with detailed charts and statistics to stay motivated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Sarah J.</h4>
                  <p className="text-sm text-muted-foreground">Lost 15 lbs in 3 months</p>
                </div>
              </div>
              <p className="text-card-foreground">"FitTracker helped me stay consistent with my workouts and nutrition. The progress charts keep me motivated!"</p>
            </div>
            
            <div className="testimonial-card bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">MT</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Mike T.</h4>
                  <p className="text-sm text-muted-foreground">Gained 10 lbs of muscle</p>
                </div>
              </div>
              <p className="text-card-foreground">"The workout tracking feature is perfect for my strength training. I can see my progress week by week."</p>
            </div>
            
            <div className="testimonial-card bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">LK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Lisa K.</h4>
                  <p className="text-sm text-muted-foreground">Marathon runner</p>
                </div>
              </div>
              <p className="text-card-foreground">"I love how I can track both my running distances and my nutrition in one app. It's made training for marathons so much easier!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Join FitTracker Today</h2>
          
          <div className="max-w-md mx-auto">
            <Card className="border shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Start your fitness journey with FitTracker
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button asChild className="w-full" type="submit">
                    <Link to="/auth">Register Now</Link>
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account? <Link to="/auth" className="text-primary hover:underline">Log in</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - preserved regardless of theme */}
      <section className="cta-section py-16 bg-gradient-to-br from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have already improved their health and fitness with FitTracker.</p>
          <Button asChild className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" size="lg">
            <Link to="/auth">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card dark:bg-card/40 text-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Activity className="h-8 w-8 mr-2 text-primary" />
                <span className="text-2xl font-bold">FitTracker</span>
              </div>
              <p className="mt-2 text-muted-foreground">Your personal fitness companion</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h5 className="font-semibold mb-4 text-foreground">Features</h5>
                <ul className="space-y-2">
                  <li><button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-foreground">Workout Tracking</button></li>
                  <li><button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-foreground">Nutrition Monitoring</button></li>
                  <li><button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-foreground">Progress Visualization</button></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4 text-foreground">Resources</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Guides</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4 text-foreground">Company</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>© 2025 FitTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
