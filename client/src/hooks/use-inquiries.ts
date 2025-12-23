import { useMutation } from "@tanstack/react-query";
import { api, type CreateInquiryRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateInquiry() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateInquiryRequest) => {
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Received",
        description: "Your message has been securely transmitted to our fiduciary team.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Transmission Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
