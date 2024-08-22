import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { constraintDirective } from 'graphql-constraint-directive';
import { GraphQLDateTime } from 'graphql-iso-date';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: {
        DateTime: GraphQLDateTime,
      },
      introspection: true,
      transformSchema: constraintDirective(),
    }),
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
