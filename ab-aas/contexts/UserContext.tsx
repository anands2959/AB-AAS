import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getUserData, UserData } from '@/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    loadUserData: (phoneNumber: string) => Promise<void>;
    clearUserData: () => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUserData = useCallback(async (phoneNumber: string) => {
        try {
            setIsLoading(true);
            const data = await getUserData(phoneNumber);
            if (data) {
                setUserData(data);
                await AsyncStorage.setItem('userPhoneNumber', phoneNumber);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearUserData = useCallback(async () => {
        try {
            setUserData(null);
            await AsyncStorage.removeItem('userPhoneNumber');
        } catch (error) {
            console.error('Error clearing user data:', error);
        }
    }, []);

    useEffect(() => {
        const loadStoredUserData = async () => {
            try {
                const storedPhone = await AsyncStorage.getItem('userPhoneNumber');
                if (storedPhone) {
                    await loadUserData(storedPhone);
                }
            } catch (error) {
                console.error('Error loading stored user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadStoredUserData();
    }, [loadUserData]);

    const value = useMemo(() => ({
        userData,
        setUserData,
        loadUserData,
        clearUserData,
        isLoading,
    }), [userData, loadUserData, clearUserData, isLoading]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
