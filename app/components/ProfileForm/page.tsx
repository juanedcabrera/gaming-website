'use client';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../components/ui/use-toast';
import { Input } from '@/components/ui/input';

interface Game {
  userId: number;
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileForm: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const profileFormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .max(30, {
        message: 'Username must not be longer than 30 characters.',
      }),
    email: z
      .string({
        required_error: 'Please select an email to display.',
      })
      .email(),
    bio: z.string().max(160).min(4).optional(),
    newPassword: z.string().min(8).max(100).optional(),
    avatar: z.string().url({ message: 'Please enter a valid URL.' }),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: 'Please enter a valid URL.' }),
        })
      )
      .optional(),
  });

  type FormValues = {
    avatar: string;
    username: string;
    email: string;
    bio?: string;
    newPassword?: string;
    urls?: { value: string }[];
  };

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken || typeof decodedToken !== 'object') {
    console.error('Decoded token not found or invalid.');
    // Handle error scenario, such as redirecting to the login page
    return;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  // UPDATE PROFILE
  const updateProfile = async (data: FormValues) => {
    try {
      const userId = decodedToken.id;
      const endpoint = `${apiUrl}/api-v1/users/profile/${userId}`;

      // Only send fields that are not blank or undefined. Had to look this up.
      const updatedData: Partial<FormValues> = {};

      if (bio) updatedData.bio = bio;
      if (avatar) updatedData.avatar = avatar;
      if (newPassword) updatedData.newPassword = newPassword;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.error(`Profile update successful!`);
      } else {
        console.error(`Profile update failed.`);
      }
    } catch (error) {
      console.error(`An error occurred during profile update:`, error);
    }
  };

  const { toast } = useToast();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const values = form.getValues();
    updateProfile(values);
    // Set all text fields to empty
    setBio('');
    setAvatar('');
    setNewPassword('');
    toast({
      title: 'Profile Updated',
      description: 'Congratulations! Your profile has been updated.',
    });
  };

  return (
    <div className="bg-gray-800">
      <Form {...form}>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share a brief introduction about yourself"
                  className="resize-none bg-gray-100"
                  {...field}
                  value={bio}
                  name="bio"
                  onChange={(e) => setBio(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-2"></div>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Avatar</FormLabel>
              <FormControl>
                <Input
                  placeholder="Paste the URL of your profile picture"
                  className="resize-none bg-gray-100"
                  {...field}
                  value={avatar}
                  name="avatar"
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="py-2"></div>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Change Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your new password"
                  className="resize-none bg-gray-100 text-black"
                  {...field}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="py-2"></div>
        <div className="py-3">
          <Button onClick={handleButtonClick} variant={'secondary'}>
            Update Profile
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProfileForm;