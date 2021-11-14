const fileInformation = (fileInfo, id) => {
    for (let i = 0; i < fileInfo.length; i++) {
        if (fileInfo[i].comment.id === id) {
            console.log("index", i)
            return fileInfo[i];
        }
    }
}

test("fileInformation helper function", () => {
    //arrange
    const id = 1
    const fileInfo = [
        {
            id: 1,
            fileName: "test.mp3",
            uploader: "nang",
            comment: {
                id: 1,
                content: "test-comment"
            }
        },
        {
            id: 2,
            fileName: "test2.mp3",
            uploader: "nang2",
            comment: {
                id: 2,
                content: "test-comment2"
            }
        }
        ]
    //act
    const outcome = fileInformation(fileInfo, id);
    console.log("outcome", outcome)
    //Assert
    expect(outcome).toEqual(
        {
            id: 1,
            fileName: "test.mp3",
            uploader: "nang",
            comment: {
                id: 1,
                content: "test-comment"
            }
        }
    );
})