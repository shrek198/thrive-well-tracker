
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Award, Calendar, Camera, Edit, Plus, Trophy, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import EditProfileDialog from '@/components/Profile/EditProfileDialog';
import AddGoalDialog from '@/components/Profile/AddGoalDialog';
import UpdateGoalDialog from '@/components/Profile/UpdateGoalDialog';
import { useMeasurements } from '@/hooks/useMeasurements';

const Profile = () => {
  const { toast } = useToast();
  const { profile, updateProfile, addGoal, updateGoal, completeGoal } = useProfile();
  const { getMeasurementsByType } = useMeasurements();
  
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isUpdateGoalOpen, setIsUpdateGoalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<typeof profile.goals[0] | null>(null);
  
  const photosData = getMeasurementsByType('photos');
  
  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };
  
  const handleAddGoal = () => {
    setIsAddGoalOpen(true);
  };
  
  const handleUpdateGoal = (goal: typeof profile.goals[0]) => {
    setSelectedGoal(goal);
    setIsUpdateGoalOpen(true);
  };
  
  const handleAddPhoto = () => {
    toast({
      title: "Add Photo",
      description: "Upload a new progress photo",
    });
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={profile.avatar || ""} />
            <AvatarFallback className="text-xl">{getAvatarFallback(profile.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.bio}</p>
          </div>
        </div>
        <Button className="w-full md:w-auto" size="sm" onClick={handleEditProfile}>
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>
      
      {/* Profile stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Activity className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-2xl font-bold">{profile.workouts}</h3>
            <p className="text-xs text-muted-foreground">Workouts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold">{profile.activeDays}</h3>
            <p className="text-xs text-muted-foreground">Active Days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Award className="h-8 w-8 text-amber-500 mb-2" />
            <h3 className="text-2xl font-bold">{profile.achievements}</h3>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Trophy className="h-8 w-8 text-emerald-500 mb-2" />
            <h3 className="text-2xl font-bold">{profile.goalsCompleted}</h3>
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
                {profile.goals.length > 0 ? (
                  profile.goals.map((goal) => (
                    <div key={goal.id} 
                      className="hover:bg-muted/50 p-2 -mx-2 rounded-md cursor-pointer transition-colors"
                      onClick={() => handleUpdateGoal(goal)}
                    >
                      <div className="flex justify-between mb-1 items-center">
                        <div>
                          <span className="text-sm font-medium">{goal.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} />
                      <p className="text-xs text-muted-foreground mt-1">{goal.current}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No active goals yet. Add your first goal!
                  </div>
                )}
                
                <Button size="sm" variant="outline" className="w-full" onClick={handleAddGoal}>
                  <Plus className="h-4 w-4 mr-2" /> Add New Goal
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Goals</CardTitle>
                <CardDescription>Goals you've successfully achieved</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.completedGoals.length > 0 ? (
                  <ul className="space-y-4">
                    {profile.completedGoals.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{item.goal}</p>
                          <p className="text-xs text-muted-foreground">Completed: {item.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed goals yet. Keep working towards your targets!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Early Bird", description: "Complete 5 workouts before 8 AM", icon: <Award className="h-6 w-6" />, unlocked: true },
              { name: "Consistency", description: "Work out 20 days in a month", icon: <Calendar className="h-6 w-6" />, unlocked: true },
              { name: "Strength Master", description: "Increase strength by 25%", icon: <Activity className="h-6 w-6" />, unlocked: true },
              { name: "Marathon Prep", description: "Run 100 miles total", icon: <Activity className="h-6 w-6" />, unlocked: true },
              { name: "Nutrition Pro", description: "Log meals for 30 days straight", icon: <Award className="h-6 w-6" />, unlocked: false },
              { name: "Weight Goal", description: "Reach your target weight", icon: <Trophy className="h-6 w-6" />, unlocked: false },
              { name: "First Milestone", description: "Complete your first workout", icon: <Trophy className="h-6 w-6" />, unlocked: false },
              { name: "Progress Tracker", description: "Log measurements for 8 weeks", icon: <Activity className="h-6 w-6" />, unlocked: false }
            ].map((achievement, i) => (
              <Card key={i} className={achievement.unlocked ? "bg-gray-50 border-primary/20 dark:bg-gray-900" : ""}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${achievement.unlocked ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && <span className="text-xs text-primary font-medium mt-2">Unlocked</span>}
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
              <Button onClick={() => {
                toast({
                  title: "Feature Coming Soon",
                  description: "Detailed statistics will be available in the next update"
                });
              }}>
                Load Statistics
              </Button>
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
              <Button size="sm" variant="outline" className="gap-2" onClick={handleAddPhoto}>
                <Camera className="h-4 w-4" /> Add Photo
              </Button>
            </CardHeader>
            <CardContent>
              {photosData.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {photosData.map((entry, index) => (
                    entry.photos?.map((photo, photoIndex) => (
                      <div key={`${index}-${photoIndex}`} className="aspect-square relative overflow-hidden rounded-md">
                        <img 
                          src={photo} 
                          alt={`Progress photo ${index + 1}-${photoIndex + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <EditProfileDialog 
        profile={profile}
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        onSave={updateProfile}
      />
      
      <AddGoalDialog
        open={isAddGoalOpen}
        onOpenChange={setIsAddGoalOpen}
        onAddGoal={addGoal}
      />
      
      <UpdateGoalDialog
        goal={selectedGoal}
        open={isUpdateGoalOpen}
        onOpenChange={setIsUpdateGoalOpen}
        onUpdateGoal={updateGoal}
        onCompleteGoal={completeGoal}
      />
    </AppLayout>
  );
};

export default Profile;
