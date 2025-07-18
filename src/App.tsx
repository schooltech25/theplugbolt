import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';
import {
    Menu, X, Package, Bell, TrendingUp, Clock, Users, TriangleAlert as AlertTriangle,
    DollarSign, ClipboardList, Settings, User, BarChart, Shield, Code, LogOut, CalendarDays,
    Utensils, Coffee, Scan, BookOpen, Truck, Warehouse, Factory, Mail, Lock
} from 'lucide-react'; // Using Lucide React for icons

// --- Firebase Configuration and Context ---

// Access environment variables using import.meta.env (Vite standard)
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';
const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG ? JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG) : {};
const initialAuthToken = import.meta.env.VITE_INITIAL_AUTH_TOKEN || null;

// Create a context for Firebase services and user information
const AuthContext = createContext(null);

// AuthProvider component to initialize Firebase and manage authentication state
const AuthProvider = ({ children }) => {
    const [app, setApp] = useState(null);
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null); // New state for user role
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initFirebase = async () => {
            try {
                // Ensure firebaseConfig is not empty before initializing
                if (Object.keys(firebaseConfig).length === 0) {
                    throw new Error("Firebase configuration is missing. Please set VITE_FIREBASE_CONFIG environment variable.");
                }

                const firebaseApp = initializeApp(firebaseConfig);
                setApp(firebaseApp);
                const firestoreDb = getFirestore(firebaseApp);
                setDb(firestoreDb);
                const firebaseAuth = getAuth(firebaseApp);
                setAuth(firebaseAuth);

                if (initialAuthToken) {
                    await signInWithCustomToken(firebaseAuth, initialAuthToken);
                } else {
                    await signInAnonymously(firebaseAuth);
                }

                const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                    if (user) {
                        setUserId(user.uid);
                        // Fetch user role from Firestore
                        const userDocRef = doc(firestoreDb, `artifacts/${appId}/users/${user.uid}/profile/data`);
                        const userDocSnap = await getDoc(userDocRef);
                        if (userDocSnap.exists()) {
                            setUserRole(userDocSnap.data().role);
                        } else {
                            // Default role if not found (e.g., for new anonymous users)
                            setUserRole('guest');
                            // For a real app, you'd have a more robust user creation/role assignment
                            // For now, let's set a default profile for new anonymous users
                            await setDoc(userDocRef, { role: 'guest', createdAt: serverTimestamp() }, { merge: true });
                        }
                    } else {
                        setUserId(null);
                        setUserRole(null);
                    }
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (err) {
                console.error("Failed to initialize Firebase or authenticate:", err);
                setError(`Failed to initialize the application: ${err.message}. Please check environment variables.`);
                setLoading(false);
            }
        };

        initFirebase();
    }, [appId, JSON.stringify(firebaseConfig), initialAuthToken]); // Re-run if these change

    const handleLogout = async () => {
        if (auth) {
            try {
                // Log the logout action and generate report (placeholder)
                console.log(`User ${userId} (${userRole}) logging out. Submitting end-of-day report.`);
                // In a real app, trigger Cloud Function to generate and submit report based on role
                // For example: await generateEndOfDayReport(userId, userRole);

                await signOut(auth);
                setUserRole(null); // Clear role on logout
                setUserId(null); // Clear userId on logout
                // After logout, the onAuthStateChanged listener will set loading to false and navigate to login
            } catch (err) {
                console.error("Error during logout:", err);
                setError("Logout failed. Please try again.");
            }
        }
    };

    if (loading) {
        return <LoadingSpinner message="Initializing application..." />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ app, db, auth, userId, userRole, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

// --- UI Components ---

const LoadingSpinner = ({ message = "Loading..." }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-lg">{message}</p>
    </div>
);

const CustomModal = ({ isOpen, title, message, onClose, onConfirm, showConfirmButton = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                    >
                        Close
                    </button>
                    {showConfirmButton && (
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                        >
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Dashboard Components (Adapted for Web with Tailwind CSS) ---

const OwnerDashboard = ({ setCurrentPage }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Owner Dashboard</h1>
            <p className="text-gray-600">Welcome, Owner! Here's your high-level overview.</p>
            {/* Quick Stats for Owner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Sales Today</span>
                    <span className="text-2xl font-bold text-blue-600">PHP 15,000</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Profit Margin</span>
                    <span className="text-2xl font-bold text-green-600">35%</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Active Staff</span>
                    <span className="text-2xl font-bold text-purple-600">8</span>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Staff Performance Overview</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-4">
                    As an Owner, you can view performance summaries for all roles.
                    You cannot change roles or directly access operational dashboards as another user.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setCurrentPage('evaluation')}
                        className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    >
                        <BarChart size={20} /> <span className="font-semibold">View All Staff Performance</span>
                    </button>
                    {/* Simplified direct navigation to evaluation for Owner/Manager */}
                </div>
            </div>
            {/* More owner-specific content */}
        </div>
    );
};

const ManagerDashboard = ({ setCurrentPage }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manager Dashboard</h1>
            <p className="text-gray-600">Welcome, Manager! Oversee daily operations.</p>
            {/* Quick Stats for Manager */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Orders Today</span>
                    <span className="text-2xl font-bold text-blue-600">PHP 12,000</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Low Stock Alerts</span>
                    <span className="text-2xl font-bold text-red-600">5</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Reservations</span>
                    <span className="text-2xl font-bold text-purple-600">3 Upcoming</span>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Staff Performance Overview</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-4">
                    As a Manager, you can view performance summaries for your staff.
                    You cannot change roles or directly access operational dashboards as another user.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setCurrentPage('evaluation')}
                        className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    >
                        <BarChart size={20} /> <span className="font-semibold">View All Staff Performance</span>
                    </button>
                </div>
            </div>
            {/* More manager-specific content */}
        </div>
    );
};

const BartenderDashboard = ({ setCurrentPage }) => {
    const quickStats = [
        { title: 'Orders Today', value: '47', change: '+8', icon: TrendingUp },
        { title: 'Avg. Process Time', value: '3.2m', change: '-0.5m', icon: Clock },
        { title: 'Walk-in Customers', value: '23', change: '+12', icon: Users },
        { title: 'Low Stock Items', value: '3', change: '-1', icon: AlertTriangle },
    ];
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Bartender Dashboard</h1>
            <p className="text-gray-600">Welcome, Bartender! Manage bar operations.</p>

            {/* Performance Stats */}
            <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Performance</h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Daily Rating</span>
                    <div className="bg-green-500 text-white text-lg font-bold px-4 py-2 rounded-full">4.8</div>
                </div>
                <p className="text-gray-600">Excellent performance today! Keep up the great work.</p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
                            <div className="flex items-center justify-between w-full mb-2">
                                <stat.icon size={20} className="text-gray-600" />
                                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</span>
                            <span className="text-sm text-gray-600">{stat.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Primary Actions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Functions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => alert('Navigating to POS')} // Replace alert with CustomModal
                        className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <Package size={32} className="mb-2" />
                        <span className="text-lg font-bold">POS System</span>
                        <span className="text-sm text-gray-300 text-center">Process walk-in orders</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('inventory')}
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <Warehouse size={32} className="mb-2" />
                        <span className="text-lg font-bold">Inventory</span>
                        <span className="text-sm text-gray-600 text-center">Manage bar stock</span>
                    </button>
                </div>
            </div>

            {/* Active Orders (Simplified) */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Orders</h2>
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Order #1247</span>
                        <div className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">In Progress</div>
                    </div>
                    <span className="text-gray-700">2x Beer, 1x Cocktail Mix</span>
                    <span className="text-gray-500 text-sm">Started 2 minutes ago</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">Order #1248</span>
                        <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">Ready</div>
                    </div>
                    <span className="text-gray-700">1x Wine, 3x Shots</span>
                    <span className="text-500 text-sm">Completed 1 minute ago</span>
                </div>
            </div>
        </div>
    );
};

const KitchenDashboard = ({ setCurrentPage }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kitchen Dashboard</h1>
            <p className="text-gray-600">Welcome, Kitchen Staff! Manage food preparation.</p>
            {/* Quick Stats for Kitchen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Orders in Queue</span>
                    <span className="text-2xl font-bold text-red-600">5</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Avg. Prep Time</span>
                    <span className="text-2xl font-bold text-blue-600">8m</span>
                </div>
            </div>

            {/* Main Functions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Functions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => alert('Navigating to KDS')} // Replace alert with CustomModal
                        className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <Utensils size={32} className="mb-2" />
                        <span className="text-lg font-bold">Kitchen Display</span>
                        <span className="text-sm text-gray-300 text-center">View incoming orders</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('inventory')}
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <Warehouse size={32} className="mb-2" />
                        <span className="text-lg font-bold">Ingredients</span>
                        <span className="text-sm text-gray-600 text-center">Manage stock & wastage</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const WaiterDashboard = ({ setCurrentPage }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Waiter Dashboard</h1>
            <p className="text-gray-600">Welcome, Waiter! Manage tables and orders.</p>
            {/* Quick Stats for Waiter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Tables Assigned</span>
                    <span className="text-2xl font-bold text-blue-600">5</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Orders Served</span>
                    <span className="text-2xl font-bold text-green-600">32</span>
                </div>
            </div>

            {/* Main Functions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Functions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setCurrentPage('pos')}
                        className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <Package size={32} className="mb-2" />
                        <span className="text-lg font-bold">Table Service</span>
                        <span className="text-sm text-gray-300 text-center">Process table orders</span>
                    </button>
                    <button
                        onClick={() => alert('Navigating to Reservations')} // Replace alert with CustomModal
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <CalendarDays size={32} className="mb-2" />
                        <span className="text-lg font-bold">Reservations</span>
                        <span className="text-sm text-gray-600 text-center">View upcoming bookings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const SecurityDashboard = ({ setCurrentPage }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Security Dashboard</h1>
            <p className="text-gray-600">Welcome, Security! Monitor premises and incidents.</p>
            {/* Quick Stats for Security */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Tickets Scanned</span>
                    <span className="text-2xl font-bold text-blue-600">120</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Incidents Logged</span>
                    <span className="text-2xl font-bold text-red-600">2</span>
                </div>
            </div>

            {/* Main Functions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Functions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => alert('Activating QR Scanner')} // Replace alert with CustomModal
                        className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <Scan size={32} className="mb-2" />
                        <span className="text-lg font-bold">QR Scanner</span>
                        <span className="text-sm text-gray-300 text-center">Validate tickets/entry</span>
                    </button>
                    <button
                        onClick={() => alert('Navigating to Incident Log')} // Replace alert with CustomModal
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <BookOpen size={32} className="mb-2" />
                        <span className="text-lg font-bold">Incident Log</span>
                        <span className="text-sm text-gray-600 text-center">Record security events</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const DeveloperDashboard = ({ setCurrentPage }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Developer Dashboard</h1>
            <p className="text-gray-600">Welcome, Developer! System maintenance and debugging.</p>
            {/* Quick Stats for Developer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Active Errors</span>
                    <span className="text-2xl font-bold text-red-600">7</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <span className="text-lg font-semibold">Last Backup</span>
                    <span className="text-2xl font-bold text-green-600">Today</span>
                </div>
            </div>

            {/* Main Functions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance & Recovery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => alert('Viewing Error Logs')} // Replace alert with CustomModal
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <Code size={32} className="mb-2" />
                        <span className="text-lg font-bold">Error Logs</span>
                        <span className="text-sm text-gray-600 text-center">Review system errors</span>
                    </button>
                    <button
                        onClick={() => alert('Triggering Fix Bug/Error process')} // Replace alert with CustomModal
                        className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <Settings size={32} className="mb-2" />
                        <span className="text-lg font-bold">Fix Bugs</span>
                        <span className="text-sm text-gray-300 text-center">Resolve reported issues</span>
                    </button>
                    <button
                        onClick={() => alert('Initiating Rollback to Date')} // Replace alert with CustomModal
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <CalendarDays size={32} className="mb-2" />
                        <span className="text-lg font-bold">Rollback to Date</span>
                        <span className="text-sm text-gray-600 text-center">Revert data to a specific day</span>
                    </button>
                    <button
                        onClick={() => alert('Initiating Rollback to Functioning Version')} // Replace alert with CustomModal
                        className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <Factory size={32} className="mb-2" />
                        <span className="text-lg font-bold">Rollback Version</span>
                        <span className="text-sm text-gray-600 text-center">Revert to last stable app version</span>
                    </button>
                    <button
                        onClick={() => alert('Initiating Factory Reset (Requires Confirmation)')} // Replace alert with CustomModal
                        className="bg-red-600 text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-red-700 transition-colors"
                    >
                        <AlertTriangle size={32} className="mb-2" />
                        <span className="text-lg font-bold">Factory Reset</span>
                        <span className="text-sm text-gray-300 text-center">(DANGER) Wipe all data</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Placeholder for POS Page
const POS = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Point of Sale</h1>
            <p className="text-gray-600">This is where you'll process orders and manage transactions.</p>
            {/* POS functionality will go here */}
        </div>
    );
};

// Placeholder for Inventory Page
const Inventory = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory Management</h1>
            <p className="text-gray-600">Manage your bar's stock, add new items, and conduct inventory counts.</p>
            {/* Inventory management functionality will go here */}
        </div>
    );
};

// Placeholder for Reports Page
const Reports = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>
            <p className="text-gray-600">View sales data, inventory levels, and other key reports.</p>
            {/* Reporting functionality will go here */}
        </div>
    );
};

// Placeholder for User Management Page
const UserManagement = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
            <p className="text-gray-600">Create, edit, and manage staff accounts and roles.</p>
            {/* User management functionality will go here */}
        </div>
    );
};

// Placeholder for Promotions Page
const Promotions = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Promotions & Vouchers</h1>
            <p className="text-gray-600">Generate and track promotional vouchers.</p>
            {/* Promotions functionality will go here */}
        </div>
    );
};

// Placeholder for Reservations Page
const Reservations = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Table Reservations</h1>
            <p className="text-gray-600">Manage table bookings and customer reservations.</p>
            {/* Reservations functionality will go here */}
        </div>
    );
};

// Placeholder for Supplier Management Page
const SupplierManagement = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Supplier Management</h1>
            <p className="text-gray-600">Manage supplier contacts and order history.</p>
            {/* Supplier management functionality will go here */}
        </div>
    );
};

// Placeholder for Settings Page
const SettingsPage = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">System Settings</h1>
            <p className="text-gray-600">Configure VAT, service charges, and other system settings.</p>
            {/* Settings functionality will go here */}
        </div>
    );
};

// Placeholder for Evaluation Dashboard
const EvaluationDashboard = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Staff Evaluation Dashboard</h1>
            <p className="text-gray-600">Monitor and evaluate staff performance.</p>
            {/* Staff list, performance metrics, graphs, evaluate buttons */}
        </div>
    );
};

// Placeholder for KDS (Kitchen Display System)
const KDS = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kitchen Display System (KDS)</h1>
            <p className="text-gray-600">View and manage incoming kitchen orders.</p>
            {/* KDS functionality */}
        </div>
    );
};

// Placeholder for Incident Log
const IncidentLog = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Incident Log</h1>
            <p className="text-gray-600">Record and review security incidents.</p>
            {/* Incident logging functionality */}
        </div>
    );
};

// Placeholder for QR Scanner
const QRScanner = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">QR Scanner</h1>
            <p className="text-gray-600">Scan QR codes for tickets, vouchers, and entry.</p>
            {/* QR scanner functionality */}
        </div>
    );
};

// --- Side Navigation Component ---
const SideNavigation = ({ isOpen, toggleNav, setCurrentPage, userRole, handleLogout, notifications }) => {
    const navItems = {
        owner: [
            { id: 'owner-dashboard', label: 'Owner Dashboard', icon: BarChart, type: 'dashboard' },
            { id: 'reports', label: 'Financial Reports', icon: DollarSign, type: 'page' },
            { id: 'user-management', label: 'User Management', icon: Users, type: 'page' },
            { id: 'promotions', label: 'Promotions', icon: Bell, type: 'page' },
            { id: 'reservations', label: 'Reservations', icon: CalendarDays, type: 'page' },
            { id: 'supplier-management', label: 'Suppliers', icon: Truck, type: 'page' },
            { id: 'inventory', label: 'Inventory (All)', icon: Warehouse, type: 'page' },
            { id: 'settings', label: 'System Settings', icon: Settings, type: 'page' },
            { id: 'evaluation', label: 'Staff Evaluation', icon: BarChart, type: 'page' },
            { id: 'developer-dashboard', label: 'Developer Dashboard', icon: Code, type: 'page' }, // Direct access for Owner
        ],
        manager: [
            { id: 'manager-dashboard', label: 'Manager Dashboard', icon: BarChart, type: 'dashboard' },
            { id: 'reports', label: 'Reports & Analytics', icon: DollarSign, type: 'page' },
            { id: 'user-management', label: 'User Management', icon: Users, type: 'page' },
            { id: 'promotions', label: 'Promotions', icon: Bell, type: 'page' },
            { id: 'reservations', label: 'Reservations', icon: CalendarDays, type: 'page' },
            { id: 'supplier-management', label: 'Suppliers', icon: Truck, type: 'page' },
            { id: 'inventory', label: 'Inventory (All)', icon: Warehouse, type: 'page' },
            { id: 'settings', label: 'System Settings', icon: Settings, type: 'page' },
            { id: 'evaluation', label: 'Staff Evaluation', icon: BarChart, type: 'page' },
        ],
        bartender: [
            { id: 'bartender-dashboard', label: 'Bartender Dashboard', icon: BarChart, type: 'dashboard' },
            { id: 'pos', label: 'POS System', icon: Package, type: 'page' },
            { id: 'inventory', label: 'My Inventory', icon: Warehouse, type: 'page' },
            { id: 'shift-log', label: 'Shift Log', icon: Clock, type: 'page' }, // Placeholder
            { id: 'recipe-view', label: 'Recipes', icon: BookOpen, type: 'page' }, // Placeholder
            { id: 'qr-scanner', label: 'QR Scanner', icon: Scan, type: 'page' },
        ],
        kitchen: [
            { id: 'kitchen-dashboard', label: 'Kitchen Dashboard', icon: BarChart, type: 'dashboard' },
            { id: 'kds', label: 'Kitchen Display', icon: Utensils, type: 'page' },
            { id: 'inventory', label: 'Ingredients', icon: Warehouse, type: 'page' },
            { id: 'production-log', label: 'Production Log', icon: Factory, type: 'page' }, // Placeholder
        ],
        waiter: [
            { id: 'waiter-dashboard', label: 'Waiter Dashboard', icon: BarChart, type: 'dashboard' },
            { id: 'pos', label: 'Table Service POS', icon: Package, type: 'page' },
            { id: 'reservations', label: 'Reservations', icon: CalendarDays, type: 'page' },
            { id: 'order-pickup', label: 'Order Pickup', icon: ClipboardList, type: 'page' }, // Placeholder
        ],
        security: [
            { id: 'security-dashboard', label: 'Security Dashboard', icon: BarChart, type: 'dashboard' },
            { id: 'qr-scanner', label: 'QR Scanner', icon: Scan, type: 'page' },
            { id: 'incident-log', label: 'Incident Log', icon: BookOpen, type: 'page' },
        ],
        developer: [
            { id: 'developer-dashboard', label: 'Developer Dashboard', icon: Code, type: 'dashboard' },
            { id: 'error-logs', label: 'Error Logs', icon: AlertTriangle, type: 'page' }, // Placeholder
            { id: 'backup-management', label: 'Backup Management', icon: Warehouse, type: 'page' }, // Placeholder
            { id: 'system-status', label: 'System Status', icon: BarChart, type: 'page' }, // Placeholder
        ],
        guest: [
            { id: 'guest-dashboard', label: 'Guest Dashboard', icon: User, type: 'dashboard' }, // A very basic dashboard for unassigned roles
        ]
    };

    const currentNavItems = navItems[userRole] || navItems['guest'];

    return (
        <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 md:shadow-lg`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">BarMaster</h2>
                <button onClick={toggleNav} className="md:hidden p-2 rounded-md hover:bg-gray-700">
                    <X size={24} />
                </button>
            </div>
            <nav>
                <ul className="space-y-2">
                    {currentNavItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => {
                                    setCurrentPage(item.id);
                                    if (window.innerWidth < 768) toggleNav(); // Close nav on mobile after selection
                                }}
                                className="flex items-center w-full p-3 rounded-md text-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                <item.icon size={20} className="mr-3" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-3 rounded-md text-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 mt-6"
                        >
                            <LogOut size={20} className="mr-3" />
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// --- Main App Component ---

// Login Screen component (adapted for web)
const LoginScreen = () => {
    const { auth, userId, userRole } = useAuth(); // Access auth from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const showCustomModal = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOpen(true);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            showCustomModal('Login Error', 'Please enter both email and password.');
            return;
        }

        try {
            // Simulate login based on email for role assignment (replace with actual Firebase auth)
            // In a real app, Firebase Auth would handle login, and then onAuthStateChanged
            // in AuthProvider would fetch the role.
            // For this demo, let's map email to a role for initial display
            let simulatedRole = 'guest';
            if (email.includes('owner')) simulatedRole = 'owner';
            else if (email.includes('manager')) simulatedRole = 'manager';
            else if (email.includes('bartender')) simulatedRole = 'bartender';
            else if (email.includes('kitchen')) simulatedRole = 'kitchen';
            else if (email.includes('waiter')) simulatedRole = 'waiter';
            else if (email.includes('security')) simulatedRole = 'security';
            else if (email.includes('developer')) simulatedRole = 'developer';

            // Simulate Firebase sign-in (replace with actual signInWithEmailAndPassword)
            // For a functional demo, we'll just "pretend" to log in and let AuthProvider handle state
            // In a real app, you'd do: await signInWithEmailAndPassword(auth, email, password);
            showCustomModal('Login Success (Simulated)', `Welcome! You are logged in as a ${simulatedRole}.`);

            // This is a simplified simulation. In a real app, the onAuthStateChanged
            // listener in AuthProvider would detect the successful login and update userRole.
            // For now, we'll just let the AuthProvider's logic flow.
        } catch (error) {
            console.error("Login error:", error);
            showCustomModal('Login Failed', `Invalid credentials or an error occurred: ${error.message}`);
        }
    };

    const handleForgotPassword = () => {
        showCustomModal('Forgot Password', 'Password reset link will be sent to your email (functionality to be implemented).');
    };

    // If user is already logged in, no need to show login screen
    if (userId && userRole) {
        return null; // Or redirect to their dashboard directly if this component is rendered conditionally
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen w-full bg-gray-900 overflow-hidden">
            <img
                src="https://placehold.co/1000x1000/000000/FFFFFF?text=BarMaster+Logo"
                alt="BarMaster Logo"
                className="absolute inset-0 w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}

            <div className="relative z-10 w-full max-w-sm p-8 bg-white bg-opacity-95 rounded-xl shadow-2xl flex flex-col items-center">
                <span className="text-xl text-gray-700 mb-2">Welcome to</span>
                <span className="text-4xl font-bold text-gray-900 mb-8">BarMaster</span>

                <div className="flex items-center w-full border border-gray-300 rounded-lg mb-4 px-4 py-2 bg-gray-50">
                    <Mail size={20} className="text-gray-500 mr-3" />
                    <input
                        type="email"
                        className="flex-1 h-10 bg-transparent text-gray-800 placeholder-gray-500 outline-none"
                        placeholder="Username or Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex items-center w-full border border-gray-300 rounded-lg mb-6 px-4 py-2 bg-gray-50">
                    <Lock size={20} className="text-gray-500 mr-3" />
                    <input
                        type="password"
                        className="flex-1 h-10 bg-transparent text-gray-800 placeholder-gray-500 outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-200 mb-4 shadow-md"
                >
                    Login
                </button>

                <button
                    onClick={handleForgotPassword}
                    className="text-gray-600 text-sm hover:underline"
                >
                    Forgot Password?
                </button>
            </div>
            <CustomModal
                isOpen={modalOpen}
                title={modalTitle}
                message={modalMessage}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};


export default function App() { // Exporting App as default
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

const AppContent = () => {
    const { userId, userRole, handleLogout } = useAuth();
    const [currentPage, setCurrentPage] = useState('login'); // Start at login, AuthProvider will redirect
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 'n1', message: 'New order received: Table 5', read: false },
        { id: 'n2', message: 'Low stock alert: Vodka', read: false },
    ]); // Placeholder notifications

    // Update current page when userRole changes after login
    useEffect(() => {
        if (userRole && currentPage === 'login') {
            setCurrentPage(`${userRole}-dashboard`);
        } else if (!userRole && currentPage !== 'login') {
            setCurrentPage('login'); // Redirect to login if user logs out
        }
    }, [userRole, currentPage]);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleNotificationClick = () => {
        // Mark all notifications as read when the bell is clicked and modal opens
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setShowNotificationModal(true);
    };

    const unreadNotificationsCount = notifications.filter(n => !n.read).length;

    // Function to render the current page based on state and user role
    const renderPage = () => {
        if (!userRole) {
            return <LoginScreen />; // Show login if no user role
        }

        switch (currentPage) {
            case 'owner-dashboard':
                return <OwnerDashboard setCurrentPage={setCurrentPage} />;
            case 'manager-dashboard':
                return <ManagerDashboard setCurrentPage={setCurrentPage} />;
            case 'bartender-dashboard':
                return <BartenderDashboard setCurrentPage={setCurrentPage} />;
            case 'kitchen-dashboard':
                return <KitchenDashboard setCurrentPage={setCurrentPage} />;
            case 'waiter-dashboard':
                return <WaiterDashboard setCurrentPage={setCurrentPage} />;
            case 'security-dashboard':
                return <SecurityDashboard setCurrentPage={setCurrentPage} />;
            case 'developer-dashboard':
                return <DeveloperDashboard setCurrentPage={setCurrentPage} />;
            case 'pos':
                return <POS />;
            case 'inventory':
                return <Inventory />;
            case 'reports':
                return <Reports />;
            case 'user-management':
                return <UserManagement />;
            case 'promotions':
                return <Promotions />;
            case 'reservations':
                return <Reservations />;
            case 'supplier-management':
                return <SupplierManagement />;
            case 'settings':
                return <SettingsPage />;
            case 'evaluation':
                return <EvaluationDashboard />;
            case 'kds':
                return <KDS />;
            case 'incident-log':
                return <IncidentLog />;
            case 'qr-scanner':
                return <QRScanner />;
            // Add other specific pages here
            default:
                return <p className="p-6 text-xl text-red-600">Page not found or not accessible for your role.</p>;
        }
    };

    return (
        <div className="flex min-h-screen font-sans antialiased bg-gray-100 text-gray-900">
            {/* Side Navigation */}
            {userRole && ( // Only show nav if logged in
                <SideNavigation
                    isOpen={isNavOpen}
                    toggleNav={toggleNav}
                    setCurrentPage={setCurrentPage}
                    userRole={userRole}
                    handleLogout={handleLogout}
                    notifications={notifications}
                />
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isNavOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                {/* Top Bar */}
                {userRole && ( // Only show top bar if logged in
                    <header className="bg-white shadow-md p-4 flex justify-between items-center z-30">
                        <button onClick={toggleNav} className="p-2 rounded-md hover:bg-gray-200 md:hidden">
                            <Menu size={24} />
                        </button>
                        <div className="text-2xl font-bold text-gray-800 md:ml-0">
                            {currentPage.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <div className="relative">
                            <button onClick={handleNotificationClick} className="p-2 rounded-md hover:bg-gray-200">
                                <Bell size={24} />
                                {unreadNotificationsCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {unreadNotificationsCount}
                                    </span>
                                )}
                            </button>
                            <CustomModal
                                isOpen={showNotificationModal}
                                title="Notifications"
                                onClose={() => setShowNotificationModal(false)}
                            >
                                {notifications.length > 0 ? (
                                    <ul className="space-y-2">
                                        {notifications.map((n) => (
                                            <li key={n.id} className={`p-3 rounded-md ${n.read ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-800 font-medium'}`}>
                                                {n.message}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No new notifications.</p>
                                )}
                            </CustomModal>
                        </div>
                    </header>
                )}
