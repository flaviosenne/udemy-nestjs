package com.micro.auth.repository;

import com.micro.auth.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmail(String email);
}
