package nl.novi.backenddondiablo.backendDonDiablo.repository;

import nl.novi.backenddondiablo.backendDonDiablo.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}
