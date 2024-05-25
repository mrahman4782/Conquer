import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './marketplace.css';

const stripePromise = loadStripe('aDl664ygCQP8jES77tn4oEEkwvPozIpuQSvWi0');

const instructors = [
    { id: 1, image: 'https://i.gyazo.com/914bb34547d8935dcce6800153cd7a9f.png', name: 'Mark', calendly: 'https://calendly.com/jhenry012/30min', amount: 5000 },
    { id: 2, image: 'https://i.gyazo.com/c72ddbe7b1ca3cdd4af2b719402055cd.png', name: 'Sienna', calendly: 'https://calendly.com/jhenry012/30min', amount: 6000 },
    { id: 3, image: 'https://i.gyazo.com/66e2d2746a189e6760fb58981d9678a1.png', name: 'Rachel', calendly: 'https://calendly.com/jhenry012/30min', amount: 7000 },
    { id: 4, image: 'https://i.gyazo.com/91d436074a84f68d1a5aa920cfff0d79.png', name: 'Carlos', calendly: 'https://calendly.com/jhenry012/30min', amount: 8000 },
    { id: 5, image: 'https://i.gyazo.com/f217eaebc1b1c7723e027492cce74e0f.png', name: 'Celeste', calendly: 'https://calendly.com/jhenry012/30min', amount: 9000 },
    { id: 6, image: 'https://i.gyazo.com/8d5a68f4bdb15b8cfc7771d1aac1a66e.png', name: 'Alyssa', calendly: 'https://calendly.com/jhenry012/30min', amount: 10000 },
];

const PaymentForm = ({ amount, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { clientSecret } = await response.json();

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError('Card not charged for development purposes.');
                setLoading(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    onPaymentSuccess();
                }
            }
        } catch (error) {
            setError('Card not charged for development purposes.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

const Marketplace = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [calendlyLink, setCalendlyLink] = useState('');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if ('Notification' in window) {
            Notification.requestPermission();
        }

        // Load Calendly script
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const openBookingModal = (link, amount) => {
        setCalendlyLink(link);
        setAmount(amount);
        setModalVisible(true);
        setShowPayment(false); // Reset the state
    };

    const handleBookingSuccess = () => {
        setShowPayment(true);
        if (Notification.permission === 'granted') {
            new Notification('Booking Confirmed', {
                body: 'Your booking has been successfully scheduled. Please proceed with the payment.',
            });
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setCalendlyLink('');
        setShowPayment(false);
        const calendlyContainer = document.getElementById('calendly-container');
        if (calendlyContainer) {
            calendlyContainer.innerHTML = ''; // Clear Calendly widget
        }
    };

    useEffect(() => {
        if (modalVisible && !showPayment) {
            const calendlyContainer = document.getElementById('calendly-container');
            if (calendlyContainer) {
                calendlyContainer.innerHTML = ''; // Clear any existing Calendly widget
            }

            if (window.Calendly) {
                window.Calendly.initInlineWidget({
                    url: calendlyLink,
                    parentElement: document.getElementById('calendly-container'),
                    prefill: {},
                    utm: {}
                });

                window.addEventListener('message', event => {
                    if (event.data.event && event.data.event.indexOf('calendly') === 0) {
                        if (event.data.event === 'calendly.event_scheduled') {
                            handleBookingSuccess();
                        }
                    }
                });
            }
        }
    }, [modalVisible, showPayment, calendlyLink]);

    return (
        <div className="content">
            <h1>Pick Your Private Session Instructor</h1>
            <div className="instructor-grid">
                {instructors.map((instructor) => (
                    <InstructorCard key={instructor.id} instructor={instructor} openBookingModal={openBookingModal} />
                ))}
            </div>
            {modalVisible && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>Close</button>
                        {!showPayment ? (
                            <>
                                <h2>Schedule Your Appointment</h2>
                                <div id="calendly-container" style={{ width: '100%', height: '500px' }} />
                            </>
                        ) : (
                            <>
                                <h2>Payment Confirmation</h2>
                                <p>Please confirm your payment of ${(amount / 100).toFixed(2)} to finalize your booking.</p>
                                <Elements stripe={stripePromise}>
                                    <PaymentForm amount={amount} onPaymentSuccess={closeModal} />
                                </Elements>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const InstructorCard = ({ instructor, openBookingModal }) => {
    return (
        <div className="instructor-card">
            <img src={instructor.image} alt={instructor.name} />
            <div className="instructor-info">
                <h2>{instructor.name}</h2>
                <button onClick={() => openBookingModal(instructor.calendly, instructor.amount)}>Book Now</button>
            </div>
        </div>
    );
};

export default Marketplace;
