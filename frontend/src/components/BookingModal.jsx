// frontend/src/components/BookingModal.jsx
import React, { useState } from 'react';
import { bookAppointment } from '../api';

const BookingModal = ({ doctors, onClose, onSuccess }) => {
  // State for form inputs
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');

  // State for handling feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple validation
    if (!doctorId || !appointmentDate || !reason) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const appointmentData = { doctorId, appointmentDate, reason };
      await bookAppointment(appointmentData);
      setSuccess('Appointment booked successfully!');
      
      // Clear the form and notify the parent component
      setDoctorId('');
      setAppointmentDate('');
      setReason('');
      onSuccess(); // This will trigger a re-fetch in the dashboard

      // Close the modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-6">Book a New Appointment</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-dark mb-1">Doctor</label>
            <select
              id="doctor"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            >
              <option value="" disabled>Select a doctor</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name} ({doc.specialization})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-dark mb-1">Date and Time</label>
            <input
              type="datetime-local"
              id="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-dark mb-1">Reason for Visit</label>
            <textarea
              id="reason"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., General check-up, follow-up"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;