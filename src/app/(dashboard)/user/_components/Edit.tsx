import { ChangeEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import SZForm from "@/components/form/SZFrom";
import SZInput from "@/components/form/SZInput";
import { EditIcon, UserIcon, XIcon, CameraIcon, ShieldCheckIcon, MapPinIcon } from "@/components/shared/Icons";
import { TError } from "@/types/global";
import { TUserDetail } from "@/types/user";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { userValidationSchema } from "@/schema/user";
import { motion, AnimatePresence } from "framer-motion";

const Update = ({ user }: { user: TUserDetail }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"personal" | "address" | "security">("personal");
    const methods = useForm({
        resolver: zodResolver(userValidationSchema),
    });

    const [previewImage, setPreviewImage] = useState(user?.avatar || "");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [updateUser] = useUpdateUserMutation();
    const [changePassword] = useChangePasswordMutation();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const formData = new FormData();

            const userData: any = {
                name: data.name,
                phone: data.phone,
                address: {
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    country: data.country,
                }
            };

            formData.append("data", JSON.stringify(userData));

            if (selectedImage) {
                formData.append("avatar", selectedImage);
            }

            // Handle Security Tab (Password Update)
            if (activeTab === 'security') {
                if (data.newPassword !== data.confirmPassword) {
                    return toast.error("Passwords do not match");
                }

                const passwordData: any = {
                    newPassword: data.newPassword,
                };

                if (user.hasPassword) {
                    if (!data.oldPassword) {
                        return toast.error("Old password is required");
                    }
                    passwordData.oldPassword = data.oldPassword;
                }

                const res = await changePassword(passwordData).unwrap();
                if (res?.success) {
                    toast.success("Security settings updated successfully", { autoClose: 1000 });
                    methods.reset();
                    setIsOpen(false);
                }
                return; // Exit after handling security
            }

            const res = await updateUser({
                id: user?._id,
                data: formData,
            }).unwrap();

            if (res?.success) {
                toast.success(res?.message, { autoClose: 1000 });
                methods.reset();
                setIsOpen(false);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err?.data?.message || "Something went wrong", {
                autoClose: 1000,
            });
        }
    };

    return (
        <div>
            <button
                className="group flex gap-2.5 px-6 py-3 rounded-[1.2rem] bg-success/10 border border-success/30 text-success font-black uppercase text-[10px] tracking-[0.2em] italic hover:bg-success hover:text-black hover:scale-[1.03] active:scale-95 transition-all duration-500 shadow-xl relative overflow-hidden"
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <EditIcon size={16} />
                <span>Adjust Protocol</span>
            </button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-4xl bg-[#0a0a0a]/90 border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <div className="overflow-hidden relative min-h-[600px] flex flex-col md:flex-row h-full">
                                    {/* Sidebar Navigation */}
                                    <div className="w-full md:w-64 bg-black/40 border-r border-white/5 p-8 flex flex-col gap-8">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Settings.</h3>
                                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed italic">System configuration module.</p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button 
                                                onClick={() => setActiveTab("personal")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'personal' ? 'bg-success text-black italic' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <UserIcon size={16} className={activeTab === 'personal' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Personnel</span>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab("address")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'address' ? 'bg-success text-black italic' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <MapPinIcon size={16} className={activeTab === 'address' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Geolocation</span>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab("security")}
                                                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'security' ? 'bg-success text-black italic' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                <ShieldCheckIcon size={16} className={activeTab === 'security' ? 'text-black' : 'group-hover:text-success'} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Encryption</span>
                                            </button>
                                        </div>

                                        <div className="mt-auto hidden md:block">
                                            <div className="p-5 rounded-2xl bg-success/5 border border-success/10 relative overflow-hidden group/tip">
                                                <p className="text-[8px] text-success font-black uppercase tracking-widest mb-1 italic">Notice</p>
                                                <p className="text-[10px] text-gray-600 font-medium leading-relaxed italic">Optimization of attribute matrix improves performance.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 p-8 md:p-10 flex flex-col overflow-hidden">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2 text-success uppercase text-[8px] font-black tracking-[0.3em] italic">
                                                    <div className="w-6 h-px bg-success/30"></div>
                                                    {activeTab === 'personal' ? 'Personnel Synchronization' : activeTab === 'address' ? 'Spatial Coordination' : 'System Authorization'}
                                                </div>
                                                <h3 className="font-black text-2xl text-white tracking-tighter uppercase leading-none italic">
                                                    {activeTab === 'personal' ? 'Identity' : activeTab === 'address' ? 'Mapping' : 'Access'} <span className="text-success">{activeTab === 'personal' ? 'Module' : activeTab === 'address' ? 'Matrix' : 'Protocol'}</span>
                                                </h3>
                                            </div>
                                            <button 
                                                onClick={() => setIsOpen(false)}
                                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                                            >
                                                <XIcon size={20} />
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-6">
                                            <FormProvider {...methods}>
                                                <SZForm
                                                    defaultValues={{
                                                        name: user?.name,
                                                        email: user.email,
                                                        phone: user?.phone,
                                                        street: user?.address?.street,
                                                        city: user?.address?.city,
                                                        state: user?.address?.state,
                                                        postalCode: user?.address?.postalCode,
                                                        country: user?.address?.country
                                                    }}
                                                    resolver={zodResolver(userValidationSchema)}
                                                    onSubmit={onSubmit}
                                                >
                                                    <motion.div 
                                                        key={activeTab}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="space-y-8"
                                                    >
                                                        {activeTab === 'personal' && (
                                                            <div className="space-y-8">
                                                                <div className="flex flex-col items-center">
                                                                    <div className="relative group">
                                                                        <div className="w-32 h-32 rounded-[2rem] overflow-hidden bg-neutral-900 border border-dashed border-success/30 relative flex items-center justify-center group-hover:border-success transition-all duration-700">
                                                                            {previewImage ? (
                                                                                <img
                                                                                    src={previewImage}
                                                                                    alt="Preview"
                                                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                                                />
                                                                            ) : (
                                                                                <UserIcon size={48} className="text-white/5" />
                                                                            )}
                                                                            <label className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500">
                                                                                <CameraIcon size={24} className="text-success mb-1" />
                                                                                <span className="text-[8px] font-black text-white uppercase tracking-widest italic">Update</span>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    onChange={handleImageChange}
                                                                                    className="hidden"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 gap-6">
                                                                    <SZInput label="Legal Name" name="name" type="text" placeholder="John Doe" />
                                                                    <SZInput label="Relay Contact" name="phone" type="text" placeholder="+1 (234) 567-890" />
                                                                    <div className="space-y-1 opacity-50">
                                                                         <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic ml-1">Secure Channel (Immutable)</label>
                                                                        <input value={user?.email} disabled className="w-full bg-[#0f0f0f] border border-white/5 p-4 rounded-xl text-xs text-gray-500 cursor-not-allowed italic font-bold" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {activeTab === 'address' && (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="md:col-span-2">
                                                                    <SZInput label="Surface Location" name="street" type="text" placeholder="123 Luxury Ave" />
                                                                </div>
                                                                <SZInput label="Municipality" name="city" type="text" placeholder="Beverly Hills" />
                                                                <SZInput label="Sub-Division" name="state" type="text" placeholder="California" />
                                                                <SZInput label="Zip-Map" name="postalCode" type="text" placeholder="90210" />
                                                                <SZInput label="Nation" name="country" type="text" placeholder="United States" />
                                                            </div>
                                                        )}

                                                        {activeTab === 'security' && (
                                                            <div className="space-y-8">
                                                                <div className="p-6 rounded-2xl bg-success/5 border border-success/10 relative overflow-hidden">
                                                                    <div className="relative z-10 space-y-6">
                                                                        <div className="space-y-1 text-center">
                                                                            <h4 className="text-sm font-black text-white uppercase tracking-tight italic">
                                                                                {user.hasPassword ? 'Credential Rotation' : 'Initialize Access'}
                                                                            </h4>
                                                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest italic leading-relaxed">
                                                                                {user.hasPassword 
                                                                                    ? 'ENCRYPT NEW SEQUENCE STRING' 
                                                                                    : 'INITIALIZE PRIVATE ACCESS KEY'}
                                                                            </p>
                                                                        </div>
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            {user.hasPassword && (
                                                                                <div className="md:col-span-2">
                                                                                    <SZInput label="Legacy Cipher" name="oldPassword" type="password" placeholder="••••••••" />
                                                                                </div>
                                                                            )}
                                                                            <SZInput label="New Cipher" name="newPassword" type="password" placeholder="••••••••" />
                                                                            <SZInput label="Verify Cipher" name="confirmPassword" type="password" placeholder="••••••••" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-4 pt-4">
                                                            <button
                                                                type="button"
                                                                className="flex-1 px-6 py-4 rounded-xl bg-white/5 text-gray-500 font-black uppercase text-[9px] tracking-[0.2em] italic hover:bg-white/10 hover:text-white transition-all border border-white/5 active:scale-95"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                Abandon
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="flex-2 px-8 py-4 rounded-xl bg-success text-black font-black uppercase text-[9px] tracking-[0.2em] italic hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                                                            >
                                                                Synchronize Updates
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                </SZForm>
                                            </FormProvider>
                                        </div>
                                    </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Update;

