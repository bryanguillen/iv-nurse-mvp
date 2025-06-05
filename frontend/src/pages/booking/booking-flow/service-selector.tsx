import { Info } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useBooking } from '../booking-provider';

interface ServiceSelectorProps {
  selectedServiceId: string | undefined;
  onServiceSelect: (serviceId: string) => void;
}

export function ServiceSelector({ selectedServiceId, onServiceSelect }: ServiceSelectorProps) {
  const { nurse } = useBooking();

  return (
    <div className="space-y-2">
      <Select value={selectedServiceId ?? ''} onValueChange={onServiceSelect}>
        <SelectTrigger className="w-full truncate">
          <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent>
          {nurse.services
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(service => (
              <SelectItem key={service.id} value={service.id} textValue={service.name}>
                <div className="flex flex-col">
                  {service.description && (
                    <span className="text-sm text-muted">{service.description}</span>
                  )}
                  {service.price > 0 && (
                    <span className="text-sm font-medium">${service.price.toFixed(2)}</span>
                  )}
                  {!service.price && (
                    <span className="text-sm font-medium text-green-500">Free</span>
                  )}
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2 text-sm text-muted">
        <Info className="size-4 text-primary" />
        <span className="text-muted">
          Want to combine drips? Add it in the notes section at checkout.
        </span>
      </div>
    </div>
  );
}
