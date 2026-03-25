package com.alejandroferrer.padelbackend;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.junit.jupiter.api.Test;
import java.io.InputStream;
import java.net.URI;

public class FipTest {

    @Test
    public void testPdfFormat() throws Exception {
        String url = "https://www.padelfip.com/wp-content/themes/padelfiptheme/cache/rankings/men_master_rev1205.pdf";
        try (InputStream is = URI.create(url).toURL().openStream();
             PDDocument doc = PDDocument.load(is)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(doc);
            String[] lines = text.split("\\R");
            System.out.println("------ FIRST 20 LINES ------");
            for(int i=0; i<lines.length && i<20; i++) {
                System.out.println(lines[i]);
            }
        }
    }
}
