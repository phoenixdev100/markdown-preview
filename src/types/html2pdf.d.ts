declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: any;
    jsPDF?: any;
    pagebreak?: {
      mode?: string[];
      before?: string;
      after?: string;
      avoid?: string | string[];
    };
  }

  interface Html2Pdf {
    set(opt: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement | string): Html2Pdf;
    toPdf(): Html2Pdf;
    toCanvas(): Html2Pdf;
    toImg(): Html2Pdf;
    save(filename?: string): Promise<void>;
  }

  function html2pdf(): Html2Pdf;
  function html2pdf(element: HTMLElement | string, opt?: Html2PdfOptions): Promise<void>;

  export = html2pdf;
}
