package com.nikitalepikhin.bccommapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.RequestParameterBuilder;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.ParameterType;
import springfox.documentation.service.RequestParameter;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.List;

@Configuration
public class SwaggerConfiguration {
    @Bean
    public Docket jwtTokenSecuredApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("bearer-api")
//                .securityContexts(List.of(securityContext()))
//                .securitySchemes(List.of(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.nikitalepikhin.bccommapp.rest.bearer"))
                .paths(PathSelectors.any())
                .build()
                .globalRequestParameters(List.of(authorizationHeader()));
    }

    @Bean
    public Docket nonSecuredApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("noauth-api")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.nikitalepikhin.bccommapp.rest.noauth"))
                .paths(PathSelectors.any())
                .build();
    }

//    private ApiKey apiKey() {
//        return new ApiKey("access_token", "Authorization", "header");
//    }

//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
//    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return List.of(new SecurityReference("JWT", authorizationScopes));
    }

    private RequestParameter authorizationHeader() {
        return new RequestParameterBuilder()
                .name("Authorization")
                .description("Authorization Header")
                .in(ParameterType.HEADER)
                .required(true)
                .build();
    }
}
