package nl.novi.backenddondiablo.backendDonDiablo;

import nl.novi.backenddondiablo.backendDonDiablo.service.MusicFileService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;

import javax.annotation.Resource;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class BackendDonDiabloApplication implements CommandLineRunner {

	@Resource
	MusicFileService musicFileService;

	public static void main(String[] args) {
		SpringApplication.run(BackendDonDiabloApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
		Path source = Paths.get(System.getProperty("user.dir") + "/uploads");
		Path target = Paths.get(System.getProperty("user.dir") + "/converted");

//		musicFileService.deleteAll();
		if (Files.notExists(source) && Files.notExists(target)) {
			musicFileService.init();
		}
	}
}
