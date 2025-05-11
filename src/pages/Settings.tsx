
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'account';
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };
  
  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo(0, 0);
  }, [tab]);

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been successfully saved.",
    });
  };
  
  const handleUpdatePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion initiated",
      description: "We've sent a confirmation email to proceed with account deletion.",
      variant: "destructive",
    });
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated.",
    });
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>
      
      <Tabs value={tab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="First name" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Last name" defaultValue="Smith" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email" defaultValue="alex@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="Phone number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdatePassword}>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="workout-reminders">Workout Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders for scheduled workouts</p>
                  </div>
                  <Switch id="workout-reminders" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="progress-updates">Weekly Progress Updates</Label>
                    <p className="text-sm text-muted-foreground">Get a summary of your weekly progress</p>
                  </div>
                  <Switch id="progress-updates" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">Receive our newsletter with fitness tips</p>
                  </div>
                  <Switch id="newsletter" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">App Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-reminders">Workout Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notifications for scheduled workouts</p>
                  </div>
                  <Switch id="app-reminders" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="goal-notifications">Goal Achievements</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you reach your fitness goals</p>
                  </div>
                  <Switch id="goal-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-md p-4 cursor-pointer bg-white flex flex-col items-center justify-center ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary mb-2"></div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div 
                    className={`border rounded-md p-4 cursor-pointer bg-gray-900 flex flex-col items-center justify-center ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary mb-2"></div>
                    <span className="text-sm font-medium text-white">Dark</span>
                  </div>
                  <div 
                    className={`border rounded-md p-4 cursor-pointer bg-gradient-to-r from-white to-gray-900 flex flex-col items-center justify-center ${theme === 'system' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary mb-2"></div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAppearance}>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your app preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Units</h3>
                
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="kg" name="weight-unit" className="text-primary" defaultChecked />
                      <Label htmlFor="kg">Kilograms (kg)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="lb" name="weight-unit" className="text-primary" />
                      <Label htmlFor="lb">Pounds (lb)</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Distance</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="km" name="distance-unit" className="text-primary" defaultChecked />
                      <Label htmlFor="km">Kilometers (km)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="mi" name="distance-unit" className="text-primary" />
                      <Label htmlFor="mi">Miles (mi)</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Get assistance with using the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">How do I track a workout?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Go to the Workouts tab, click "New Workout" and follow the instructions to log your exercise.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">How do I log my meals?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Navigate to the Nutrition tab, click "Add Meal" and enter your food items and portions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">How do I set fitness goals?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Go to your Profile, click on the Goals tab and select "Add New Goal" to create a custom target.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Contact Support</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input id="support-subject" placeholder="Brief description of your issue" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-message">Message</Label>
                    <textarea 
                      id="support-message" 
                      rows={4} 
                      className="w-full border border-input bg-background px-3 py-2 rounded-md" 
                      placeholder="Describe your issue in detail"
                    ></textarea>
                  </div>
                </div>
                <Button onClick={() => toast({ title: "Message sent", description: "We'll respond to your inquiry within 24 hours." })}>
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Settings;
