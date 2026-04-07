import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Como funciona a compra?", a: "Você escolhe a planta no nosso catálogo e clica no botão de compra. Será redirecionado para o WhatsApp, onde finalizamos o pedido de forma rápida e personalizada." },
  { q: "Vocês entregam para todo o Brasil?", a: "Não. Atendemos exclusivamente clientes do Espírito Santo, com foco no DDD 27. Isso nos permite garantir a qualidade e frescor das plantas na entrega." },
  { q: "Posso encomendar uma planta específica?", a: "Sim! Entre em contato pelo WhatsApp e informe qual planta deseja. Faremos o possível para atender seu pedido." },
  { q: "As plantas vêm com vaso?", a: "Depende do produto. Alguns itens acompanham vaso decorativo, outros são vendidos separadamente. Consulte a descrição do produto ou pergunte pelo WhatsApp." },
  { q: "Vocês têm opções para presente?", a: "Sim! Temos kits especiais para presente com embalagem diferenciada. Ideal para aniversários, datas comemorativas e surpresas." },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-primary-lighter/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Perguntas Frequentes</h2>
          <p className="text-muted-foreground">Tire suas dúvidas sobre a TonyPlantas</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
