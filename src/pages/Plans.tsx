
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast"

const plans = [
  {
    name: 'Basic',
    price: 0,
    features: [
      'Up to 100 students',
      'Basic attendance tracking',
      'Monthly reports',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: 29,
    features: [
      'Unlimited students',
      'Advanced analytics',
      'Real-time tracking',
      'Priority support',
      'Custom reports',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Everything in Pro',
      'Custom integration',
      'Dedicated support',
      'SLA guarantee',
      'Custom features',
      'Training sessions'
    ]
  }
];

const Plans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePlanSelect = (plan: typeof plans[0]) => {
    if (!user) {
      navigate('/auth');
      toast({
        title: "Authentication Required",
        description: "Please sign in to select a plan.",
      });
      return;
    }
    // Here you would typically integrate with a payment provider
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-neutral-600">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-xl p-8 border border-neutral-100">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 rounded-lg font-medium ${
                  plan.name === 'Pro'
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
