import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './marketplace.css';

const stripePromise = loadStripe('your_public_stripe_key_here');

const instructors = [
    { id: 1, image: 'https://via.placeholder.com/150', name: 'Instructor 1', calendly: 'https://calendly.com/jhenry012/30min', amount: 5000 },
    { id: 2, image: 'https://via.placeholder.com/150', name: 'Instructor 2', calendly: 'https://calendly.com/instructor2', amount: 6000 },
    { id: 3, image: 'https://via.placeholder.com/150', name: 'Instructor 3', calendly: 'https://calendly.com/instructor3', amount: 7000 },
    { id: 4, image: 'https://via.placeholder.com/150', name: 'Instructor 4', calendly: 'https://calendly.com/instructor4', amount: 8000 },
    { id: 5, image: 'https://via.placeholder.com/150', name: 'Instructor 5', calendly: 'https://calendly.com/instructor5', amount: 9000 },
    { id: 6, image: 'https://via.placeholder.com/150', name: 'Instructor 6', calendly: 'https://calendly.com/instructor6', amount: 10000 },
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
                setError(result.error.message);
                setLoading(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    onPaymentSuccess();
                }
            }
        } catch (error) {
            setError(error.message);
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
