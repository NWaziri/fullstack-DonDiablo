package nl.novi.backenddondiablo.backendDonDiablo.exception;


public class InvalidPasswordException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidPasswordException(String message) {
        super(message);
    }
    public InvalidPasswordException() {
        super("Invalid password.");
    }
}