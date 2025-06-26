import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, GraduationCap, ArrowRight } from 'lucide-react';

interface OnboardingForm {
  email: string;
  university: string;
  dorm: string;
  gradYear: string;
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingForm>();

  const universities = [
    'MIT - Massachusetts Institute of Technology',
    'BU - Boston University',
    'Northeastern University',
    'Harvard University',
    'Boston College',
    'Tufts University'
  ];

  const handleEmailSubmit = async (data: { email: string }) => {
    setIsVerifying(true);
    // Simulate magic link verification
    setTimeout(() => {
      setStep(2);
      setIsVerifying(false);
    }, 2000);
  };

  const handleProfileSubmit = (data: OnboardingForm) => {
    // Save user profile
    localStorage.setItem('userProfile', JSON.stringify(data));
    navigate('/marketplace');
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Welcome to DECK'D
            </h1>
            <p className="text-dark-300">
              Enter your university email to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" size={20} />
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.edu$/,
                      message: 'Please enter a valid .edu email address'
                    }
                  })}
                  type="email"
                  placeholder="your.email@university.edu"
                  className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-600 rounded-2xl text-white placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-gradient-primary text-white font-semibold py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isVerifying ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Send Magic Link
                  <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </button>
          </form>

          {isVerifying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl text-center"
            >
              <p className="text-primary-400 text-sm">
                Check your email for the magic link to continue!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Complete Your Profile
          </h1>
          <p className="text-dark-300">
            Tell us about yourself to get personalized recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-6">
          <div>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" size={20} />
              <select
                {...register('university', { required: 'Please select your university' })}
                className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-600 rounded-2xl text-white focus:border-primary-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Select your university</option>
                {universities.map((uni) => (
                  <option key={uni} value={uni} className="bg-dark-800">{uni}</option>
                ))}
              </select>
            </div>
            {errors.university && (
              <p className="text-red-400 text-sm mt-2">{errors.university.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" size={20} />
              <input
                {...register('dorm', { required: 'Dorm/location is required' })}
                type="text"
                placeholder="Dorm name or ZIP code"
                className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-600 rounded-2xl text-white placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>
            {errors.dorm && (
              <p className="text-red-400 text-sm mt-2">{errors.dorm.message}</p>
            )}
          </div>

          <div>
            <select
              {...register('gradYear', { required: 'Graduation year is required' })}
              className="w-full px-4 py-4 bg-dark-800 border border-dark-600 rounded-2xl text-white focus:border-primary-500 focus:outline-none transition-colors appearance-none"
            >
              <option value="">Graduation year</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
            {errors.gradYear && (
              <p className="text-red-400 text-sm mt-2">{errors.gradYear.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-primary text-white font-semibold py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            Complete Setup
            <ArrowRight className="ml-2" size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;