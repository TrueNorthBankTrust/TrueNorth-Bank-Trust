import { PageTransition } from "@/components/PageTransition";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type CreateInquiryRequest } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Send } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useCreateInquiry();
  
  const form = useForm<CreateInquiryRequest>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: CreateInquiryRequest) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                  Secure Correspondence
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  For institutional correspondence, verification inquiries, and strategic partnership proposals. All communications are encrypted and archived for fiduciary compliance.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 group hover:border-accent transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-primary uppercase text-sm tracking-wider">Primary Institutional Contact</h3>
                  </div>
                  <a href="mailto:truenorthbankmainbranch@californiamail.com" className="text-lg md:text-xl font-medium text-gray-800 hover:text-primary transition-colors break-all">
                    truenorthbankmainbranch@californiamail.com
                  </a>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 group hover:border-accent transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-primary uppercase text-sm tracking-wider">Sovereign & Private Member Contact</h3>
                  </div>
                  <a href="mailto:NSU@socialworker.net" className="text-lg md:text-xl font-medium text-gray-800 hover:text-primary transition-colors break-all">
                    NSU@socialworker.net
                  </a>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h4 className="font-serif font-bold text-primary mb-2">Fiduciary Notice</h4>
                <p className="text-sm text-gray-600">
                  Communications transmitted to these addresses constitute formal notice. Please ensure all attachments utilize standard PDF encryption where sensitive financial data is concerned.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-2xl font-serif font-bold text-primary mb-8">Direct Inquiry Form</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-bold text-gray-500">Full Legal Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-md" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-bold text-gray-500">Official Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="name@organization.com" className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-md" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-bold text-gray-500">Message Context</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please detail the nature of your inquiry..." className="min-h-[150px] bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-md resize-none p-4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm rounded transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    {isPending ? "Transmitting..." : "Secure Transmit"}
                    {!isPending && <Send className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
