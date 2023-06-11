const SectionTitle = (props) => {
    const { heading, subHeading } = props;
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            <p className="mb-2">{subHeading}</p>
            <h3 className="text-4xl uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;


