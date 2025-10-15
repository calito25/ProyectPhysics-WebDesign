package ProyectoFinal.Final;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@SpringBootApplication
public class FinalApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalApplication.class, args);
	}

	// Verifica la conexión a MySQL al iniciar
	@Bean
	public CommandLineRunner testDatabaseConnection(@Autowired DataSource dataSource) {
		return args -> {
			try (Connection conn = dataSource.getConnection()) {
				System.out.println("Conexión exitosa a arcadia_db!");
			} catch (SQLException e) {
				System.err.println("Error de conexión a MySQL: " + e.getMessage());
			}
		};
	}

}
