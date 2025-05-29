import { Input, Label, Textarea } from '@/components';

import type { BookingUserInfo } from './booking-machine';

interface UserInfoFormProps {
  userInfo: BookingUserInfo;
  onChange: (field: keyof BookingUserInfo, value: string) => void;
}

export function UserInfoForm({ userInfo, onChange }: UserInfoFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={userInfo.firstName}
          onChange={e => onChange('firstName', e.target.value)}
          placeholder="Enter your first name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={userInfo.lastName}
          onChange={e => onChange('lastName', e.target.value)}
          placeholder="Enter your last name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={userInfo.phone}
          onChange={e => onChange('phone', e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input
          id="streetAddress"
          value={userInfo.streetAddress}
          onChange={e => onChange('streetAddress', e.target.value)}
          placeholder="Enter your street address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={userInfo.city}
          onChange={e => onChange('city', e.target.value)}
          placeholder="Enter your city"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={userInfo.state}
          onChange={e => onChange('state', e.target.value)}
          placeholder="Enter your state"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zip">ZIP Code</Label>
        <Input
          id="zip"
          value={userInfo.zip}
          onChange={e => onChange('zip', e.target.value)}
          placeholder="Enter your ZIP code"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={userInfo.notes}
          onChange={e => onChange('notes', e.target.value)}
          placeholder="Any additional information you'd like to share like an additional service or special instructions for how to access your property"
        />
      </div>
    </div>
  );
}
