
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Award, Calendar, Camera, Edit, Trophy, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  return (
    <AppLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src="" />
            <AvatarFallback className="text-xl">AS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Alex Smith</h1>
            <p className="text-muted-foreground">Fitness Enthusiast</p>
          </div>
        </div>
        <Button className="w-full md:w-auto" size="sm">
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>
      
      {/* Profile stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Activity className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-2xl font-bold">48</h3>
            <p className="text-xs text-muted-foreground">Workouts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold">86</h3>
            <p className="text-xs text-muted-foreground">Active Days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Award className="h-8 w-8 text-amber-500 mb-2" />
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Trophy className="h-8 w-8 text-emerald-500 mb-2" />
            <h3 className="text-2xl font-bold">5</h3>
            <p className="text-xs text-muted-foreground">Goals Completed</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="goals" className="mb-6">
        <TabsList>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Goals</CardTitle>
                <CardDescription>Track your progress towards your fitness goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1 items-center">
                    <div>
                      <span className="text-sm font-medium">Lose 10 lbs</span>
                    </div>
                    <span className="text-sm text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} />
                  <p className="text-xs text-muted-foreground mt-1">7 lbs lost, 3 lbs to go</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 items-center">
                    <div>
                      <span className="text-sm font-medium">Run 5K in under 25 minutes</span>
                    </div>
                    <span className="text-sm text-muted-foreground">40%</span>
                  </div>
                  <Progress value={40} />
                  <p className="text-xs text-muted-foreground mt-1">Current best: 28:15</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 items-center">
                    <div>
                      <span className="text-sm font-medium">Do 10 pull-ups in a row</span>
                    </div>
                    <span className="text-sm text-muted-foreground">60%</span>
                  </div>
                  <Progress value={60} />
                  <p className="text-xs text-muted-foreground mt-1">Current best: 6 pull-ups</p>
                </div>
                
                <Button size="sm" variant="outline" className="w-full">
                  Add New Goal
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Goals</CardTitle>
                <CardDescription>Goals you've successfully achieved</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { goal: "Work out 3 times a week for a month", date: "March 2025" },
                    { goal: "Complete a 10K run", date: "February 2025" },
                    { goal: "Bench press 150 lbs", date: "January 2025" },
                    { goal: "Maintain food log for 30 days straight", date: "December 2024" },
                    { goal: "Complete a 30-day yoga challenge", date: "November 2024" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{item.goal}</p>
                        <p className="text-xs text-muted-foreground">Completed: {item.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Early Bird", description: "Complete 5 workouts before 8 AM", icon: <Award className="h-6 w-6" /> },
              { name: "Consistency", description: "Work out 20 days in a month", icon: <Calendar className="h-6 w-6" /> },
              { name: "Strength Master", description: "Increase strength by 25%", icon: <Activity className="h-6 w-6" /> },
              { name: "Marathon Prep", description: "Run 100 miles total", icon: <Activity className="h-6 w-6" /> },
              { name: "Nutrition Pro", description: "Log meals for 30 days straight", icon: <Award className="h-6 w-6" /> },
              { name: "Weight Goal", description: "Reach your target weight", icon: <Trophy className="h-6 w-6" /> },
              { name: "First Milestone", description: "Complete your first workout", icon: <Trophy className="h-6 w-6" /> },
              { name: "Progress Tracker", description: "Log measurements for 8 weeks", icon: <Activity className="h-6 w-6" /> }
            ].map((achievement, i) => (
              <Card key={i} className={i < 4 ? "bg-gray-50 border-primary/20" : ""}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${i < 4 ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-500"}`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {i < 4 && <span className="text-xs text-primary font-medium mt-2">Unlocked</span>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Workout Statistics</CardTitle>
              <CardDescription>Your fitness activity over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              Detailed workout statistics will appear here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Progress Photos</CardTitle>
                <CardDescription>Visual record of your fitness journey</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Camera className="h-4 w-4" /> Add Photo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Profile;
