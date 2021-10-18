package nl.novi.backenddondiablo.backendDonDiablo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    private final JavaMailSender mailSender;

    @Autowired
    EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("demodropapplication@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Bevestiging upload demo");
        message.setText("Uw demo is ontvangen, wij zorgen zullen deze zo snel mogelijk beoordelen");

        mailSender.send(message);
        System.out.println("mail has been sent to " + toEmail);
    }
}
