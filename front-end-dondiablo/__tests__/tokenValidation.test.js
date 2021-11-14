const validToken = (unixExpireTimeStamp, currentUnixTimeStamp) => {
        if (unixExpireTimeStamp - currentUnixTimeStamp > 0) {
            return true;
        } else {
            return false;
        }
}

test("Test de tokenValidation helper functie", () => {
    //arrange
    const expireTimeStamp = 100
    const currentTimeStamp = 120
    //act
    const outcome = validToken(expireTimeStamp, currentTimeStamp)
    //Assert
    expect(outcome).toEqual(false)
})