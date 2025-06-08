package com.fallingreflection.game;

import org.springframework.core.env.Environment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FallingReflectionApplication {

	public static void main(String[] args) {
		SpringApplication.run(FallingReflectionApplication.class, args);
	}

	@Autowired private Environment env; 
	
	@Bean public 
	CommandLineRunner printPropertiesOnStartup() { 
		return args -> { 
			System.out.println("============================================================"); 
			System.out.println(" DATABASE CONNECTION DEBUG INFO "); 
			System.out.println("============================================================");
			System.out.println("URL: " + env.getProperty("spring.datasource.url")); 
			System.out.println("Username: " + env.getProperty("spring.datasource.username")); 
			System.out.println("Password: " + env.getProperty("spring.datasource.password")); 
			System.out.println("============================================================"); 
		}; 
	}
}
