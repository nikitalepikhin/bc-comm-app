//package com.nikitalepikhin.bccommapp.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.builders.RequestParameterBuilder;
//import springfox.documentation.service.ParameterType;
//import springfox.documentation.service.RequestParameter;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//
//import java.util.List;
//
//@Configuration
//public class SwaggerConfiguration {
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.nikitalepikhin.bccommapp.rest"))
//                .paths(PathSelectors.any())
//                .build()
//                .globalRequestParameters(List.of(authorizationHeader()));
//    }
//
//    private RequestParameter authorizationHeader() {
//        return new RequestParameterBuilder()
//                .name("Authorization")
//                .description("Authorization Header")
//                .in(ParameterType.HEADER)
//                .required(true)
//                .build();
//    }
//}
