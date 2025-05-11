
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, PieChart, Calendar, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-fitness-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Activity className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">FitTracker</h1>
            <p className="text-xl mb-8">Your personal fitness companion to track workouts, nutrition, and progress all in one place.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="text-lg px-8 py-6" size="lg">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white hover:bg-white/20" size="lg">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need To Reach Your Fitness Goals</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-fitness-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-fitness-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Workouts</h3>
              <p className="text-gray-600">Log exercises, sets, reps, and duration to keep track of your fitness journey.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-fitness-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-8 w-8 text-fitness-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Monitor Nutrition</h3>
              <p className="text-gray-600">Track meals, calories, and macronutrients to optimize your diet.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-fitness-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Weight className="h-8 w-8 text-fitness-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visualize Progress</h3>
              <p className="text-gray-600">See your progress with detailed charts and statistics to stay motivated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-500">Lost 15 lbs in 3 months</p>
                </div>
              </div>
              <p className="text-gray-600">"FitTracker helped me stay consistent with my workouts and nutrition. The progress charts keep me motivated!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Mike T.</h4>
                  <p className="text-sm text-gray-500">Gained 10 lbs of muscle</p>
                </div>
              </div>
              <p className="text-gray-600">"The workout tracking feature is perfect for my strength training. I can see my progress week by week."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Lisa K.</h4>
                  <p className="text-sm text-gray-500">Marathon runner</p>
                </div>
              </div>
              <p className="text-gray-600">"I love how I can track both my running distances and my nutrition in one app. It's made training for marathons so much easier!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-fitness-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have already improved their health and fitness with FitTracker.</p>
          <Button asChild className="text-lg px-8 py-6 bg-white text-fitness-primary hover:bg-gray-100" size="lg">
            <Link to="/auth">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Activity className="h-8 w-8 mr-2" />
                <span className="text-2xl font-bold">FitTracker</span>
              </div>
              <p className="mt-2 text-gray-400">Your personal fitness companion</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h5 className="font-semibold mb-4">Features</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Workout Tracking</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Nutrition Monitoring</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Progress Visualization</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4">Resources</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold mb-4">Company</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 FitTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
