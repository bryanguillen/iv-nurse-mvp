import { useEffect, useState } from 'react';

import { supabase } from '@/config/supabase';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

type PatientData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

type BookingCardViewDetailsProps = {
  patientId: string;
};

export function BookingCardViewDetails({ patientId }: BookingCardViewDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const fetchPatientData = async () => {
    if (!isOpen) return; // Don't fetch if dialog is closed
    
    setLoading(true);
    setError(null);

    try {
      // First get the patient data
      const { data: patient, error: patientError } = await supabase
        .from('patients')
        .select('first_name, last_name, phone, address_id')
        .eq('id', patientId)
        .single();

      if (patientError) throw patientError;

      // Then get the address data
      const { data: address, error: addressError } = await supabase
        .from('addresses')
        .select('line1, city, state, postal_code')
        .eq('id', patient.address_id)
        .single();

      if (addressError) throw addressError;

      setPatientData({
        firstName: patient.first_name,
        lastName: patient.last_name,
        phone: patient.phone,
        address: {
          line1: address.line1,
          city: address.city,
          state: address.state,
          postalCode: address.postal_code,
        },
      });
    } catch (err) {
      setError('Failed to load patient information');
      console.error('Error fetching patient data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPatientData();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Information</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="text-destructive text-center py-4">
            {error}
          </div>
        )}

        {patientData && !loading && !error && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Name:</div>
              <div>{`${patientData.firstName} ${patientData.lastName}`}</div>

              <div className="font-medium">Phone:</div>
              <div>{patientData.phone}</div>

              <div className="font-medium">Address:</div>
              <div className="space-y-1">
                <div>{patientData.address.line1}</div>
                <div>{`${patientData.address.city}, ${patientData.address.state} ${patientData.address.postalCode}`}</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 