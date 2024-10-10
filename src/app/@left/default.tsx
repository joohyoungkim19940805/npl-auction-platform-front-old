import Sidebar from '@/components/layouts/Sidebar';

const Default = () => {
    let activeIndex = 1;
    return <Sidebar {...{ activeIndex }} />;
};
export default Default;
